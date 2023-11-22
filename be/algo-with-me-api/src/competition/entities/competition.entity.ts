import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompetitionProblem } from './competition.problem.entity';
import { Submission } from './submission.entity';

@Entity()
export class Competition {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '대회 id' })
  id: number;

  @ApiProperty({ description: '대회 이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '대회에 대한 설명글' })
  @Column('text')
  detail: string;

  @ApiProperty({ description: '대회에 참여 가능한 최대 인원' })
  @Column()
  maxParticipants: number;

  @ApiProperty({ description: '대회 시작 일시' })
  @Column()
  startsAt: Date;

  @ApiProperty({ description: '대회 종료 일시' })
  @Column()
  endsAt: Date;

  @ApiProperty({ description: '제출(submission) 테이블과 일대다 관계' })
  @OneToMany(() => Submission, (submission) => submission.competition)
  submissions: Submission[];

  @ApiProperty({ description: '대회문제(competitionProblem) 테이블과 일대다 관계' })
  @OneToMany(() => CompetitionProblem, (competitionProblem) => competitionProblem.competition)
  competitionProblems: CompetitionProblem[];

  @ApiProperty({ description: '레코드 생성 일시' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '레코드 수정 일시' })
  @UpdateDateColumn()
  updatedAt: Date;
}
