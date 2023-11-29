import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Competition } from '@src/competition/entities/competition.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  competitionId: number;

  @ManyToOne(() => Competition, (competition) => competition.dashboards)
  competition: Competition;

  @Column('jsonb')
  result: object[];
}
