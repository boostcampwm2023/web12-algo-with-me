import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateProblemDto } from '../dto/create-problem.dto';
import { ProblemService } from '../services/problem.service';

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @Get()
  findAll() {
    return this.problemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.problemService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompetitionDto: UpdateCompetitionDto) {
  //   return this.competitionService.update(+id, updateCompetitionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.problemService.remove(id);
  }
}
