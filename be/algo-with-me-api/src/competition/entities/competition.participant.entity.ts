import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Competition } from './competition.entity';

import { User } from '@src/user/entities/user.entity';

@Entity()
@Unique('unique_participant', ['user', 'competition'])
export class CompetitionParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.participants, {nullable: false})
  user: User;

  @ManyToOne(() => Competition, (competition) => competition, {nullable: false})
  competition: Competition;

  @CreateDateColumn()
  createdAt: Date;
}
