import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Competition } from './competition.entity';
import { Problem } from './problem.entity';

@Entity()
export class CompetitionProblem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  competitionId: number;

  @ManyToOne(() => Competition, (competition) => competition.competitionProblems, {
    nullable: false,
  })
  competition: Competition;

  @Column()
  problemId: number;

  @ManyToOne(() => Problem, (problem) => problem.competitionProblems, { nullable: false })
  problem: Problem;

  @CreateDateColumn()
  createdAt: Date;
}
