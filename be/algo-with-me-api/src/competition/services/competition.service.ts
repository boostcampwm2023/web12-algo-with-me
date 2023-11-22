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
import { ProblemSimpleResponseDto } from '../dto/problem.simple.response.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { CompetitionProblem } from '../entities/competition.problem.entity';
import { Problem } from '../entities/problem.entity';
import { Submission } from '../entities/submission.entity';

import { CompetitionResponseDto } from '@src/competition/dto/competition.response.dto';
import { CompetitionSimpleResponseDto } from '@src/competition/dto/competition.simple-response.dto';
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
    @InjectRepository(CompetitionProblem)
    private readonly competitionProblemRepository: Repository<CompetitionProblem>,
    @InjectQueue(process.env.REDIS_MESSAGE_QUEUE_NAME) private submissionQueue: Queue,
  ) {}

  async findAll() {
    const competitionList = await this.competitionRepository.find();
    return competitionList.map((competition) => {
      return new CompetitionSimpleResponseDto(
        competition.id,
        competition.name,
        competition.detail,
        competition.maxParticipants,
        competition.startsAt.toISOString(),
        competition.endsAt.toISOString(),
        competition.createdAt.toISOString(),
        competition.updatedAt.toISOString(),
      );
    });
  }

  async findOne(id: number) {
    const result = await this.competitionRepository.findOneBy({ id });
    if (!result)
      throw new NotFoundException(`대회 id ${id}에 해당하는 대회 정보를 찾을 수 없습니다`);
    return new CompetitionResponseDto(
      result.id,
      result.name,
      result.detail,
      result.maxParticipants,
      result.startsAt.toISOString(),
      result.endsAt.toISOString(),
      result.createdAt.toISOString(),
      result.updatedAt.toISOString(),
    );
  }

  async create(createCompetitionDto: CreateCompetitionDto) {
    const result = await this.competitionRepository.save(createCompetitionDto.toEntity());
    return new CompetitionResponseDto(
      result.id,
      result.name,
      result.detail,
      result.maxParticipants,
      result.startsAt.toISOString(),
      result.endsAt.toISOString(),
      result.createdAt.toISOString(),
      result.updatedAt.toISOString(),
    );
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

  async findCompetitionProblemList(competitionId: number) {
    const competition = await this.competitionProblemRepository.find({
      select: {
        problem: {
          id: true,
          title: true,
        },
      },
      where: {
        competition: {
          id: competitionId,
        },
      },
      relations: {
        problem: true,
      },
    });

    return competition.map((element: CompetitionProblem) => {
      return new ProblemSimpleResponseDto(element.problem.id, element.problem.title);
    });
  }
}
