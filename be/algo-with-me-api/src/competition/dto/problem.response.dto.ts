import { ApiProperty } from '@nestjs/swagger';

import { Problem } from '../entities/problem.entity';

export class ProblemResponseDto {
  constructor(
    id: number,
    title: string,
    timeLimit: number,
    memoryLimit: number,
    content: string,
    testcaseNum: number,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.timeLimit = timeLimit;
    this.memoryLimit = memoryLimit;
    this.content = content;
    this.testcaseNum = testcaseNum;
    this.createdAt = createdAt;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ description: '시간제한(ms)' })
  timeLimit: number;

  @ApiProperty({ description: '메모리제한(KB)' })
  memoryLimit: number;

  @ApiProperty({ description: '문제 내용' })
  content: string;

  @ApiProperty({ description: '테스트케이스 개수' })
  testcaseNum: number;

  @ApiProperty()
  createdAt: Date;

  static from(problem: Problem, content: string) {
    return new ProblemResponseDto(
      problem.id,
      problem.title,
      problem.timeLimit,
      problem.memoryLimit,
      content,
      problem.testcaseNum,
      problem.createdAt,
    );
  }
}
