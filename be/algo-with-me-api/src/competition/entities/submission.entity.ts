import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Competition } from './competition.entity';
import { Problem } from './problem.entity';
import { RESULT } from '../competition.enums';

import { User } from '@src/user/entities/user.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  code: string;

  @Column({
    type: 'enum',
    enum: RESULT,
    default: RESULT.PROGRESS,
  })
  result: string;

  @Column('json', { nullable: true, default: [] })
  detail: object[];

  @ManyToOne(() => Problem, (problem) => problem.submissions, { nullable: false })
  problem: Problem;

  @ManyToOne(() => Competition, (competition) => competition.submissions, { nullable: false })
  competition: Competition;

  @ManyToOne(() => User, (user) => user.submissions, { nullable: false })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
