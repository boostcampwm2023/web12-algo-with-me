import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Competition } from './competition.entity';
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

  @Column('json', { nullable: true, default: [] })
  detail: object[];

  @Column()
  problemId: number;

  @ManyToOne(() => Problem, (problem) => problem.submissions, { nullable: false })
  @JoinColumn({ name: 'problemId', referencedColumnName: 'id' })
  problem: Problem;

  @Column()
  competitionId: number;

  @ManyToOne(() => Competition, (competition) => competition.submissions)
  @JoinColumn({ name: 'competitionId', referencedColumnName: 'id' })
  competition: Competition;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
