import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Competition } from './competition.entity';

import { User } from '@src/user/entities/user.entity';

@Entity()
export class CompetitionParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.participants)
  user: User;

  @ManyToOne(() => Competition, (competition) => competition)
  competition: Competition;

  @CreateDateColumn()
  createdAt: Date;
}
