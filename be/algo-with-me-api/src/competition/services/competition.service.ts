import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Server } from 'socket.io';
import { DataSource, Repository } from 'typeorm';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

import { CompetitionProblemResponseDto } from '../dto/competition.problem.response.dto';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { ProblemSimpleResponseDto } from '../dto/problem.simple.response.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { CompetitionParticipant } from '../entities/competition.participant.entity';
import { CompetitionProblem } from '../entities/competition.problem.entity';
import { Problem } from '../entities/problem.entity';
import { Submission } from '../entities/submission.entity';

import { CompetitionResponseDto } from '@src/competition/dto/competition.response.dto';
import { CompetitionSimpleResponseDto } from '@src/competition/dto/competition.simple-response.dto';
import { CreateCompetitionDto } from '@src/competition/dto/create-competition.dto';
import { UpdateCompetitionDto } from '@src/competition/dto/update-competition.dto';
import { Competition } from '@src/competition/entities/competition.entity';
import { User } from '@src/user/entities/user.entity';

@Injectable()
export class CompetitionService {
  server: Server;
  constructor(
    @InjectRepository(Competition) private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(CompetitionProblem)
    private readonly competitionProblemRepository: Repository<CompetitionProblem>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(CompetitionParticipant)
    private readonly competitionParticipantRepository: Repository<CompetitionParticipant>,
    @InjectQueue(process.env.REDIS_MESSAGE_QUEUE_NAME) private submissionQueue: Queue,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    const competitionList = await this.competitionRepository.find();
    return competitionList.map((competition) => {
      return CompetitionSimpleResponseDto.from(competition);
    });
  }

  async findOne(competitionId: number) {
    const competition = await this.competitionRepository.findOneBy({ id: competitionId });
    this.assertCompetitionExists(competition);
    return CompetitionResponseDto.from(competition);
  }

  async create(createCompetitionDto: CreateCompetitionDto) {
    this.assertProblemIdsArrayLengthNotExceeds30(createCompetitionDto);

    const competitionProblems: CompetitionProblem[] = [];
    for (const problemId of createCompetitionDto.problemIds) {
      const problem = await this.assertProblemExistsInDb(problemId, createCompetitionDto);
      const competitionProblem = new CompetitionProblem();
      competitionProblem.problem = problem;
      competitionProblems.push(competitionProblem);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const competition: Competition = await this.competitionRepository.save(createCompetitionDto, {
        transaction: false,
      });
      for (const competitionProblem of competitionProblems) {
        competitionProblem.competition = competition;
        await this.competitionProblemRepository.save(competitionProblem, { transaction: false });
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
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

  async joinCompetition(competitionId: number, email: string) {
    const competition: Competition = await this.competitionRepository.findOneBy({
      id: competitionId,
    });
    this.assertCompetitionExists(competition);
    const user: User = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new NotFoundException('찾을 수 없는 유저입니다.');

    const isAlreadyJoined: CompetitionParticipant[] =
      await this.competitionParticipantRepository.find({
        where: {
          competitionId: competition.id,
          userId: user.id,
        },
      });
    if (isAlreadyJoined.length !== 0) throw new BadRequestException('이미 참여중인 유저입니다.');
    this.competitionParticipantRepository.save({ competition: competition, user: user });
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
  private assertCompetitionExists(competition: Competition) {
    if (!competition)
      throw new NotFoundException(
        `대회 id ${competition.id}에 해당하는 대회 정보를 찾을 수 없습니다`,
      );
  }

  private async assertProblemExistsInDb(
    problemId: number,
    createCompetitionDto: CreateCompetitionDto,
  ) {
    const problem = await this.problemRepository.findOneBy({ id: problemId });
    if (!problem) {
      throw new NotFoundException(
        `대회를 생성할 때 주어진 문제 리스트 ${JSON.stringify(
          createCompetitionDto.problemIds,
        )}에 존재하지 않는 문제가 있습니다 (id: ${problemId})`,
      );
    }
    return problem;
  }

  private assertProblemIdsArrayLengthNotExceeds30(createCompetitionDto: CreateCompetitionDto) {
    if (createCompetitionDto.problemIds.length > 30) {
      throw new BadRequestException(
        `정책 상 하나의 대회에서는 30개가 넘는 문제를 출제할 수 없습니다. (${createCompetitionDto.problemIds.length}개를 출제함)`,
      );
    }
  }
}
