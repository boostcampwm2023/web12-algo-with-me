import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Problem } from './problem.entity';
import { RESULT } from './submission.enums';

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

  @Column('json', { nullable: true })
  detail: string;

  @ManyToOne(() => Problem, (problem) => problem.submissions, { nullable: false })
  problem: Problem;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
