import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Server } from 'socket.io';
import { Repository } from 'typeorm';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

import { CompetitionProblemResponseDto } from '../dto/competition.problem.response.dto';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { Problem } from '../entities/problem.entity';
import { Submission } from '../entities/submission.entity';

import { CreateCompetitionDto } from '@src/competition/dto/create-competition.dto';
import { UpdateCompetitionDto } from '@src/competition/dto/update-competition.dto';
import { Competition } from '@src/competition/entities/competition.entity';

@Injectable()
export class CompetitionService {
  server: Server;
  constructor(
    @InjectRepository(Competition) private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    @InjectQueue(process.env.REDIS_MESSAGE_QUEUE_NAME) private submissionQueue: Queue,
  ) {}

  async findOne(id: number) {
    return await this.competitionRepository.findOneBy({ id });
  }

  async create(createCompetitionDto: CreateCompetitionDto) {
    return this.competitionRepository.create(createCompetitionDto.toEntity());
  }

  async update(id: number, updateCompetitionDto: UpdateCompetitionDto) {
    const result = await this.competitionRepository.update({ id: id }, { ...updateCompetitionDto });
    return !!result.affected;
  }

  async findOneProblem(id: number) {
    const problem = await this.problemRepository.findOneBy({ id });
    const fileName = id.toString() + '.md';
    const paths = path.join(process.env.PROBLEM_PATH, fileName);
    if (!existsSync(paths)) throw new NotFoundException('문제 파일을 찾을 수 없습니다.');
    const content = readFileSync(paths).toString();
    return new CompetitionProblemResponseDto(
      problem.id,
      problem.title,
      problem.timeLimit,
      problem.memoryLimit,
      content,
      problem.solutionCode,
      [{ temp: '임시' }],
      problem.createdAt,
    );
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
  // TODO: 유저, 대회 도메인 구현 이후 수정 필요

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
    this.server.to(scoreResultDto.socketId).emit('scoreResult', result);
  }
}
