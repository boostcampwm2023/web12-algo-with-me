import { ApiProperty } from '@nestjs/swagger';

export class CompetitionProblemResponseDto {
  constructor(
    id: number,
    title: string,
    timeLimit: number,
    memoryLimit: number,
    content: string,
    solutionCode: string,
    testcases: object[],
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.timeLimit = timeLimit;
    this.memoryLimit = memoryLimit;
    this.content = content;
    this.solutionCode = solutionCode;
    this.testcases = testcases;
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

  @ApiProperty({ description: '초기 코드' })
  solutionCode: string;

  @ApiProperty({ description: '공개 테스트 케이스' })
  testcases: object[];

  @ApiProperty()
  createdAt: Date;
}
