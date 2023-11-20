import { ApiProperty } from '@nestjs/swagger';

export class ProblemResponseDto {
  constructor(
    id: number,
    title: string,
    timeLimit: number,
    memoryLimit: number,
    content: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.timeLimit = timeLimit;
    this.memoryLimit = memoryLimit;
    this.content = content;
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

  @ApiProperty()
  createdAt: Date;
}
