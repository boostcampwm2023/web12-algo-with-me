import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompetitionProblem } from './competition.problem.entity';
import { CompetitionParticipant } from './participant.entity';
import { Submission } from './submission.entity';

@Entity()
export class Competition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  detail: string;

  @Column()
  maxParticipants: number;

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @OneToMany(() => Submission, (submission) => submission.competition)
  submissions: Submission[];

  @OneToMany(() => CompetitionProblem, (competitionProblem) => competitionProblem.competition)
  competitionProblems: CompetitionProblem[];

  @OneToMany(
    () => CompetitionParticipant,
    (competitionParticipant) => competitionParticipant.competition,
  )
  competitionParticipants: CompetitionParticipant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
