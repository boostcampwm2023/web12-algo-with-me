import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompetitionParticipant } from '@src/competition/entities/competition.participant.entity';
import { Submission } from '@src/competition/entities/submission.entity';

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

  @OneToMany(() => Submission, (submission) => submission.user, { nullable: false })
  submissions: Submission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
