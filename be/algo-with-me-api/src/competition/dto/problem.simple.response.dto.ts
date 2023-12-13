import { ApiProperty } from '@nestjs/swagger';

export class ProblemSimpleResponseDto {
  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
