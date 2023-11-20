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

  @ManyToOne(() => Competition, (competition) => competition.submissions)
  competition: Competition;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
