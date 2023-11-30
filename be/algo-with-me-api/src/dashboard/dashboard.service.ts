import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';

import { RESULT } from '@src/competition/competition.enums';
import { Competition } from '@src/competition/entities/competition.entity';
import { CompetitionProblem } from '@src/competition/entities/competition.problem.entity';

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
    competition: Competition,
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

    const time: number = Math.ceil(
      (new Date().getTime() - competition.startsAt.getTime()) / (1000 * 60),
    );
    value[problemId] = time;
    await this.redis
      .multi()
      .set(recordKey, JSON.stringify(value))
      .zincrby(scoreKey, million - time, email)
      .exec();
  }

  isCorrected(value: object, problemId: number) {
    if (value[problemId] === null || Number(value[problemId]) === -1) return false;
    return true;
  }
}
