import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

<<<<<<< HEAD
import { Competition } from '@src/competition/entities/competition.entity';
import { CompetitionParticipant } from '@src/competition/entities/competition.participant.entity';
=======
>>>>>>> 4e7f5da38dc17402cae27b808106db6a5adde1b4
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

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];

  @OneToMany(() => Competition, (competition) => competition.user)
  competitions: Competition[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
