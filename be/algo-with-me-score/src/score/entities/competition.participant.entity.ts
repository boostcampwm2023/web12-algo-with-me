import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Competition } from './competition.entity';
import { User } from './user.entity';

@Entity()
@Unique('unique_participant', ['user', 'competition'])
export class CompetitionParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.competitionParticipant, { nullable: false })
  user: User;

  @Column()
  competitionId: number;

  @ManyToOne(() => Competition, (competition) => competition.competitionParticipants, {
    nullable: false,
  })
  competition: Competition;

  @CreateDateColumn()
  createdAt: Date;
}
