import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: '유저 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '이메일' })
  @Column()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '닉네임 초기값은 이메일' })
  @Column()
  nickname: string;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn()
  updatedAt: Date;
}