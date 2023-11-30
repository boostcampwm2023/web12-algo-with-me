import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';

import { RESULT } from '@src/competition/competition.enums';
import { CompetitionProblem } from '@src/competition/entities/competition.problem.entity';

// TODO: 서버가 여러개가 될 경우 트랜잭션 관련 문제 발생할 수 있음
@Injectable()
export class DashboardService {
  COMPETITION = 'competition';
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(CompetitionProblem)
    private readonly competitionProblemRepository: Repository<CompetitionProblem>,
  ) {}

  async registerUserAtCompetition(competitionId: number, email: string) {
    const scoreKey: string = `${this.COMPETITION}:${competitionId}`;
    const recordKey: string = `${this.COMPETITION}:${competitionId}:${email}`;
    const num: number | null = await this.redis.zrank(scoreKey, email);
    console.log('num:', num);
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
      console.log(value);
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
    const value = await JSON.parse(await this.redis.get(recordKey));
    console.log(value);

    if (this.isCorrected(value, problemId)) return;

    if (result !== RESULT.CORRECT) {
      value[problemId] = -1;
      await this.redis.set(recordKey, JSON.stringify(value));
      console.log('DASHBOARD WRONG');
      return;
    }

    const time: number = Math.ceil((new Date().getTime() - startsAt.getTime()) / (1000 * 60));
    value[problemId] = time;
    await this.redis
      .multi()
      .set(recordKey, JSON.stringify(value))
      .zincrby(scoreKey, million - time, email)
      .exec();
  }

  async getTop100Dashboard(competitionId: number, email?: string): Promise<object> {
    const scoreKey: string = `${this.COMPETITION}:${competitionId}`;
    const recordKey: string = `${this.COMPETITION}:${competitionId}:${email}`;
    const ret = { competitionId };
    const rankings = [];
    const emails = [];
    let myranking = {};

    const scores = await this.redis.zrevrange(scoreKey, 0, 100, 'WITHSCORES');
    if (email) {
      const [rank, score, problemDict] = await this.redis
        .multi()
        .zrevrank(scoreKey, email)
        .zscore(scoreKey, email)
        .get(recordKey)
        .exec();
      myranking['email'] = email;
      myranking['score'] = score[1];
      myranking['rank'] = rank[1];
      myranking['problemDict'] = JSON.parse(problemDict[1] as string);
    } else myranking = null;

    for (let i = 0; i < scores.length; i += 2) {
      rankings.push({ email: scores[i], score: scores[i + 1] });
      emails.push(scoreKey + ':' + scores[i]);
    }
    const problems = await this.redis.mget(emails);
    console.log(problems);
    for (const [idx, ranking] of rankings.entries()) {
      console.log(idx);
      ranking['problemDict'] = await JSON.parse(problems[idx]);
    }

    ret['rankings'] = rankings;
    ret['myRanking'] = myranking;
    if (rankings.length === 0) ret['totalProblemCount'] = 0;
    else ret['totalProblemCount'] = Object.keys(rankings[0]['problemDict']).length;
    console.log(ret);
    return ret;
  }

  isCorrected(value: object, problemId: number) {
    if (value[problemId] === null || Number(value[problemId]) === -1) return false;
    return true;
  }
}
