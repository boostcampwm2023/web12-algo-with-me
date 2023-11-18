import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Server } from 'socket.io';
import { Repository } from 'typeorm';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { Problem } from '../entities/problem.entity';
import { Submission } from '../entities/submission.entity';

@Injectable()
export class CompetitionService {
  server: Server;
  constructor(
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    @InjectQueue(process.env.REDIS_MESSAGE_QUEUE_NAME) private submissionQueue: Queue,
  ) {}

  async findOneProblem(id: number) {
    const problem = await this.problemRepository.findOneBy({ id });
    const fileName = id.toString() + '.md';
    const paths = path.join(process.env.PROBLEM_PATH, id.toString(), fileName);
    if (!existsSync(paths)) throw new NotFoundException('문제 파일을 찾을 수 없습니다.');
    const content = readFileSync(paths).toString();
    return {
      id: problem.id,
      title: problem.title,
      timeLimit: problem.timeLimit,
      memoryLimit: problem.memoryLimit,
      content: content,
      solutionCode: problem.solutionCode,
      testcases: '임시',
      createdAt: problem.createdAt,
    };
  }

  async scoreSubmission(createSubmissionDto: CreateSubmissionDto, socketId: string) {
    const problem: Problem = await this.problemRepository.findOneBy({
      id: createSubmissionDto.problemId,
    });
    const submission: Submission = createSubmissionDto.toEntity(problem);
    const savedSubmission: Submission = await this.submissionRepository.save(submission);
    await this.submissionQueue.add({
      problemId: savedSubmission.problem.id,
      submissionId: savedSubmission.id,
      socketId: socketId,
    });

    return savedSubmission;
  }

  async saveScoreResult(scoreResultDto: ScoreResultDto) {
    const submission = await this.submissionRepository.findOneBy({
      id: scoreResultDto.submissionId,
    });
    if (!submission) throw new NotFoundException('제출 기록이 없습니다.');

    const result = {
      testcaseId: scoreResultDto.testcaseId,
      result: scoreResultDto.result,
    };

    submission.detail.push(result);
    this.submissionRepository.save(submission);

    result['problemId'] = scoreResultDto.problemId;
    result['stdOut'] = scoreResultDto.stdOut;
    this.server.to(scoreResultDto.socketId).emit('messages', result);
  }
}
