import { ApiProperty } from '@nestjs/swagger';

export class ProblemListResponseDto {
  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
