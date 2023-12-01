import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Server } from 'socket.io';
import { DataSource, Repository } from 'typeorm';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

import { ProblemService } from './problem.service';
import { RESULT } from '../competition.enums';
import { CompetitionProblemResponseDto } from '../dto/competition.problem.response.dto';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { ProblemSimpleResponseDto } from '../dto/problem.simple.response.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { CompetitionParticipant } from '../entities/competition.participant.entity';
import { CompetitionProblem } from '../entities/competition.problem.entity';
import { Problem } from '../entities/problem.entity';
import { Submission } from '../entities/submission.entity';

import { CompetitionDto } from '@src/competition/dto/competition.dto';
import { CompetitionResponseDto } from '@src/competition/dto/competition.response.dto';
import { CompetitionSimpleResponseDto } from '@src/competition/dto/competition.simple-response.dto';
import { Competition } from '@src/competition/entities/competition.entity';
import { DashboardService } from '@src/dashboard/dashboard.service';
import { User } from '@src/user/entities/user.entity';

@Injectable()
export class CompetitionService {
  server: Server;
  FIVE_MINUTES: number = 5 * 60 * 1000;
  constructor(
    @InjectRepository(Competition) private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(CompetitionProblem)
    private readonly competitionProblemRepository: Repository<CompetitionProblem>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(CompetitionParticipant)
    private readonly competitionParticipantRepository: Repository<CompetitionParticipant>,
    @InjectQueue('submission') private submissionQueue: Queue,
    private dataSource: DataSource,
    private readonly problemService: ProblemService,
    private readonly dashboardService: DashboardService,
  ) {}

  async findAll() {
    const competitionList = await this.competitionRepository.find();
    return competitionList.map((competition) => {
      return CompetitionSimpleResponseDto.from(competition);
    });
  }

  async findOne(competitionId: number) {
    const competitions: Competition[] = await this.competitionRepository.find({
      select: {
        user: {
          email: true,
        },
      },
      where: { id: competitionId },
      relations: {
        user: true,
      },
    });
    if (competitions.length !== 1)
      throw new NotFoundException(
        `대회 id ${competitionId}에 해당하는 대회 정보를 찾을 수 없습니다`,
      );
    const competition: Competition = competitions.shift();
    const competitionParticipants: CompetitionParticipant[] =
      await this.competitionParticipantRepository.find({
        select: {
          user: {
            email: true,
          },
        },
        where: {
          competitionId: competitionId,
        },
        relations: {
          user: true,
        },
      });
    return CompetitionResponseDto.from(
      competition,
      competition.user.email,
      competitionParticipants.map((element: CompetitionParticipant) => element.user.email),
    );
  }

  async create(competitionDto: CompetitionDto, user: User) {
    this.competitionTimeValidation(competitionDto);

    const competitionProblems: CompetitionProblem[] = [];
    for (const problemId of competitionDto.problemIds) {
      const problem = await this.assertProblemExistsInDb(problemId);
      const competitionProblem = new CompetitionProblem();
      competitionProblem.problem = problem;
      competitionProblems.push(competitionProblem);
    }

    const competition: Competition = competitionDto.toEntity(user);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedCompetition: Competition = await queryRunner.manager.save(competition);
      competitionProblems.forEach(
        (element: CompetitionProblem) => (element.competition = savedCompetition),
      );
      queryRunner.manager.save(competitionProblems);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async update(id: number, competitionDto: CompetitionDto, user: User) {
    const competition: Competition = await this.competitionRepository.findOneBy({ id });

    if (!competition) throw new NotFoundException('대회를 찾을 수 없습니다.');
    if (competition.userId !== user.id) throw new UnauthorizedException('대회 주최자가 아닙니다.');
    console.log(competition.startsAt.toString(), new Date().toString());
    if (competition.startsAt.getTime() - new Date().getTime() < this.FIVE_MINUTES)
      throw new BadRequestException('대회 시작 5분 전 부터는 수정이 불가능합니다.');
    this.competitionTimeValidation(competitionDto);

    const competitionProblems: CompetitionProblem[] = [];
    competitionDto.problemIds.forEach(async (element: number) => {
      const problem: Problem = await this.assertProblemExistsInDb(element);
      const competitionProblem: CompetitionProblem = new CompetitionProblem();
      competitionProblem.competitionId = competition.id;
      competitionProblem.problem = problem;
      competitionProblems.push(competitionProblem);
    });

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(CompetitionProblem, { competitionId: competition.id });
      await queryRunner.manager.update(Competition, competition.id, competitionDto.toEntity(user));
      await queryRunner.manager.save(competitionProblems);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
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

  async isUserJoinedCompetition(competitionId: number, userId: number) {
    console.log(competitionId, userId);
    const competitionParticipant: CompetitionParticipant =
      await this.competitionParticipantRepository.findOneBy({ competitionId, userId });

    if (!competitionParticipant) throw new UnauthorizedException('대회 참여자가 아닙니다.');
    return true;
  }

  async scoreSubmission(createSubmissionDto: CreateSubmissionDto, socketId: string, user: User) {
    const problem: Problem = await this.problemRepository.findOneBy({
      id: createSubmissionDto.problemId,
    });
    const submission: Submission = createSubmissionDto.toEntity(problem, user);
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

    // 모두 제출했는지 확인
    const testcaseNum: number = await this.problemService.getProblemTestcaseNum(
      submission.problemId,
    );
    let totalResult: keyof typeof RESULT = 'CORRECT';
    if (testcaseNum === submission.detail.length) {
      const user: User = await this.userRepository.findOneBy({ id: submission.userId });
      const competition: Competition = await this.competitionRepository.findOneBy({
        id: submission.competitionId,
      });
      for (const detail of submission.detail) {
        if (detail['result'] !== RESULT.CORRECT) {
          totalResult = 'WRONG';
          break;
        }
      }

      // 모든 테스트케이스가 채점 완료되면 redis 수정
      await this.dashboardService.updateUserSubmission(
        submission.competitionId,
        submission.problemId,
        user.email,
        RESULT[totalResult],
        competition.startsAt,
      );
    }
    result['problemId'] = submission.problemId;
    result['stdout'] = scoreResultDto.stdout;
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

  private async assertProblemExistsInDb(problemId: number) {
    const problem = await this.problemRepository.findOneBy({ id: problemId });
    if (!problem) {
      throw new NotFoundException(`존재하지 않는 문제가 있습니다 (problemId: ${problemId})`);
    }
    return problem;
  }

  private competitionTimeValidation(createCompetitionDto: CompetitionDto) {
    const startsAt = new Date(createCompetitionDto.endsAt);
    const endsAt = new Date(createCompetitionDto.startsAt);
    if (startsAt.getTime() - endsAt.getTime() < this.FIVE_MINUTES)
      throw new BadRequestException('대회 시간은 최소 5분 이상이어야 합니다.');
    if (startsAt.getTime() - new Date().getTime() < this.FIVE_MINUTES)
      throw new BadRequestException(
        '대회 시작 시간은 현재 시간으로부터 최소 5분 이후이어야 합니다.',
      );
  }
}
