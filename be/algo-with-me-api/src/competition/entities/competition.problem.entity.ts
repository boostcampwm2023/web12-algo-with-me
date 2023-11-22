import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Competition } from './competition.entity';
import { Problem } from './problem.entity';

@Entity()
export class CompetitionProblem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '대회(competition) 테이블과 다대일 관계' })
  @ManyToOne(() => Competition, (competition) => competition.competitionProblems)
  competition: Competition;

  @ApiProperty({ description: '문제(problem) 테이블과 다대일 관계' })
  @ManyToOne(() => Problem, (problem) => problem.competitionProblems)
  problem: Problem;

  @CreateDateColumn()
  createdAt: Date;
}
