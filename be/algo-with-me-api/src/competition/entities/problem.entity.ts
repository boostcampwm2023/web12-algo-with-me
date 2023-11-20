import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';

import { Competition } from './competition.entity';
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

  @ApiProperty()
  @ManyToMany(() => Competition, (competition) => competition.problems)
  @JoinTable({
    name: 'CompetitionProblem',
    joinColumn: { name: 'problemId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'competitionId', referencedColumnName: 'id' },
  })
  competitions: Competition[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
