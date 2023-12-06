import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';

import { Dashboard } from './entities/dashboard.entity';

import { RESULT } from '@src/competition/competition.enums';
import { Competition } from '@src/competition/entities/competition.entity';
import { CompetitionProblem } from '@src/competition/entities/competition.problem.entity';

// TODO: 서버가 여러개가 될 경우 트랜잭션 관련 문제 발생할 수 있음
@Injectable()
export class DashboardService {
  COMPETITION = 'competition';
  FIVE_MINUTES = 1000 * 60 * 5;
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(CompetitionProblem)
    private readonly competitionProblemRepository: Repository<CompetitionProblem>,
    @InjectRepository(Competition) private readonly competitionRepository: Repository<Competition>,
    @InjectRepository(Dashboard) private readonly dashboardRepository: Repository<Dashboard>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async registerUserAtCompetition(competitionId: number, email: string) {
    const scoreKey: string = `${this.COMPETITION}:${competitionId}`;
    const recordKey: string = `${this.COMPETITION}:${competitionId}:${email}`;
    const num: number | null = await this.redis.zrank(scoreKey, email);
    this.logger.debug('num:', num);
    if (num === null) {
      const competitionProblems: CompetitionProblem[] =
        await this.competitionProblemRepository.find({
          where: {
            competitionId: competitionId,
          },
        });
      const value = {};
      competitionProblems.forEach(
        (element: CompetitionProblem) => (value[element.problemId] = null),
      );
      this.logger.debug(value);
      await this.redis
        .multi()
        .zadd(scoreKey, 0, email)
        .set(recordKey, JSON.stringify(value))
        .exec();
    }
  }

  async updateUserSubmission(
    competitionId: number,
    problemId: number,
    email: string,
    result: string,
    startsAt: Date,
  ) {
    const scoreKey: string = `${this.COMPETITION}:${competitionId}`;
    const recordKey: string = `${this.COMPETITION}:${competitionId}:${email}`;
    const million: number = 1000000;
    const record = await JSON.parse(await this.redis.get(recordKey));
    this.logger.debug(record);

    if (this.isAlreadyCorrect(record, problemId)) return;

    if (result !== RESULT.CORRECT) {
      record[problemId] = -1;
      await this.redis.set(recordKey, JSON.stringify(record));
      this.logger.debug('DASHBOARD WRONG');
      return;
    }

    const time: number = Math.ceil((new Date().getTime() - startsAt.getTime()) / (1000 * 60));
    record[problemId] = time;
    await this.redis
      .multi()
      .set(recordKey, JSON.stringify(record))
      .zincrby(scoreKey, million - time, email)
      .exec();
  }

  async getTop100DashboardRedis(competitionId: number, email?: string): Promise<object> {
    const scoreKey: string = `${this.COMPETITION}:${competitionId}`;
    const recordKey: string = `${this.COMPETITION}:${competitionId}:${email}`;
    const ret = { competitionId };

    const scores = await this.redis.zrevrange(scoreKey, 0, 100, 'WITHSCORES');

    const { rankings } = await this.getRankings(scores, scoreKey);
    const myRanking = await this.getMyRanking(email, scoreKey, recordKey);

    ret['rankings'] = rankings;
    ret['myRanking'] = myRanking;
    if (rankings.length === 0) ret['totalProblemCount'] = 0;
    else ret['totalProblemCount'] = Object.keys(rankings[0]['problemDict']).length;
    this.logger.debug(ret);
    return ret;
  }

  async getTop100Dashboard(competitionId: number, email?: string) {
    const competition: Competition = await this.competitionRepository.findOneBy({
      id: competitionId,
    });
    if (!competition) throw new NotFoundException(`${competitionId}는 존재하지 않는 대회입니다.`);
    if (new Date().getTime() - competition.endsAt.getTime() < this.FIVE_MINUTES) {
      throw new BadRequestException('대회 종료 5분 이후부터 http 요청으로 조회가 가능합니다.');
    }

    const scoreKey: string = `${this.COMPETITION}:${competitionId}`;
    const recordKey: string = `${this.COMPETITION}:${competitionId}:${email}`;
    const scores = await this.redis.zrevrange(scoreKey, 0, -1, 'WITHSCORES');

    let dashboard: Dashboard = await this.dashboardRepository.findOneBy({
      competitionId: competitionId,
    });
    if (!dashboard) {
      dashboard = new Dashboard();
      dashboard.competition = competition;

      const ret = { competitionId };
      const { rankings, emails } = await this.getRankings(scores, scoreKey);
      const myRanking = await this.getMyRanking(email, scoreKey, recordKey);

      ret['rankings'] = rankings;
      if (rankings.length === 0) ret['totalProblemCount'] = 0;
      else ret['totalProblemCount'] = Object.keys(rankings[0]['problemDict']).length;
      dashboard.result = ret;
      await this.dashboardRepository.save(dashboard);

      ret['myRanking'] = myRanking;
      ret['rankings'] = ret['rankings'].slice(0, 100);
      this.logger.debug(ret);

      await this.redis.unlink(scoreKey);
      for (const email of emails) await this.redis.unlink(email);

      return ret;
    } else {
      const ret = dashboard.result;
      const myRankingIdx = ret['rankings'].findIndex((element) => element.email === email);
      if (myRankingIdx === -1) ret['myRanking'] = null;
      else {
        const myRanking = JSON.parse(JSON.stringify(ret['rankings'][myRankingIdx]));
        myRanking['rank'] = myRankingIdx + 1;
        ret['myRanking'] = myRanking;
      }

      ret['rankings'] = ret['rankings'].slice(0, 100);
      return ret;
    }
  }

  isAlreadyCorrect(value: object, problemId: number) {
    if (value[problemId] === null || Number(value[problemId]) === -1) return false;
    return true;
  }

  async getRankings(scores: string[], scoreKey: string) {
    const rankings = [];
    const emails = [];

    for (let i = 0; i < scores.length; i += 2) {
      rankings.push({ email: scores[i], score: scores[i + 1] });
      emails.push(scoreKey + ':' + scores[i]);
    }

    if (emails.length === 0) return { rankings, emails };

    const problems = await this.redis.mget(emails);
    this.logger.debug(problems);
    for (const [idx, ranking] of rankings.entries()) {
      ranking['problemDict'] = await JSON.parse(problems[idx]);
    }
    return { rankings, emails };
  }

  async getMyRanking(email: string, scoreKey: string, recordKey: string) {
    let myRanking = {};
    this.logger.debug(email, await this.redis.zrank(scoreKey, email));
    if (email && (await this.redis.zrank(scoreKey, email)) !== null) {
      const [rank, score, problemDict] = await this.redis
        .multi()
        .zrevrank(scoreKey, email)
        .zscore(scoreKey, email)
        .get(recordKey)
        .exec();
      myRanking['email'] = email;
      myRanking['score'] = score[1];
      myRanking['rank'] = Number(rank[1]) + 1;
      myRanking['problemDict'] = JSON.parse(problemDict[1] as string);
    } else myRanking = null;
    return myRanking;
  }
}
