import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Competition } from './competition.entity';
import { Language } from '../../problem/entities/language.entity';
import { Problem } from '../../problem/entities/problem.entity';
import { User } from '../../user/entities/user.entity';
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

  @Column('jsonb', { nullable: true, default: [] })
  detail: object[];

  @Column()
  problemId: number;

  @ManyToOne(() => Problem, (problem) => problem.submissions, { nullable: false })
  problem: Problem;

  @Column()
  competitionId: number;

  @ManyToOne(() => Competition, (competition) => competition.submissions, { nullable: false })
  competition: Competition;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.submissions, { nullable: false })
  user: User;

  @Column()
  languageId: number;

  @ManyToOne(() => Language, (language) => language.submissions, { nullable: false })
  language: Language;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
