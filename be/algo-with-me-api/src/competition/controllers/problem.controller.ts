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
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProblemDto } from '../dto/create-problem.dto';
import { ProblemResponseDto } from '../dto/problem.response.dto';
import { ProblemSimpleResponseDto } from '../dto/problem.simple.response.dto';
import { Problem } from '../entities/problem.entity';
import { ProblemService } from '../services/problem.service';

@ApiTags('문제(problems)')
@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @ApiOperation({ summary: '문제 생성', description: '문제를 생성한다.' })
  @ApiCreatedResponse({ type: Problem })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @Get()
  @ApiOperation({ summary: '문제 전체 조회', description: '문제 목록을 조회한다.' })
  @ApiResponse({ type: ProblemSimpleResponseDto, isArray: true })
  findAll() {
    return this.problemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '문제 상세 조회', description: '문제 세부 정보를 조회한다.' })
  @ApiResponse({ type: ProblemResponseDto })
  findOne(@Param('id') id: number) {
    return this.problemService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompetitionDto: UpdateCompetitionDto) {
  //   return this.competitionService.update(+id, updateCompetitionDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: '문제 삭제' })
  remove(@Param('id') id: number) {
    this.problemService.remove(id);
  }
}
