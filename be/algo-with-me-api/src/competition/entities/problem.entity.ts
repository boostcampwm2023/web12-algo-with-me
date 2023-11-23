import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompetitionProblem } from './competition.problem.entity';
import { Submission } from './submission.entity';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  timeLimit: number;

  @Column()
  memoryLimit: number;

  @Column()
  testcaseNum: number;

  @Column('text')
  frameCode: string;

  @Column('text')
  solutionCode: string;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[];

  @OneToMany(() => CompetitionProblem, (competitionProblem) => competitionProblem.problem)
  competitionProblems: CompetitionProblem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
