import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  timeLimit: number;

  @ApiProperty()
  @Column()
  memoryLimit: number;

  @ApiProperty()
  @Column()
  testcaseNum: number;

  @ApiProperty()
  @Column('text')
  frameCode: string;

  @ApiProperty()
  @Column('text')
  solutionCode: string;

  @ApiProperty()
  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[];

  @ApiProperty({ description: '대회문제(competitionProblem) 테이블과 일대다 관계' })
  @OneToMany(() => CompetitionProblem, (competitionProblem) => competitionProblem.problem)
  competitionProblems: CompetitionProblem[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
