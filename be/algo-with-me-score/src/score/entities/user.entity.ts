import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Competition } from './competition.entity';
import { CompetitionParticipant } from './competition.participant.entity';
import { Submission } from './submission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  nickname: string;

  @OneToMany(() => CompetitionParticipant, (competitionParticipant) => competitionParticipant.user)
  competitionParticipant: CompetitionParticipant[];

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];

  @OneToMany(() => Competition, (competition) => competition.user)
  competitions: Competition[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
