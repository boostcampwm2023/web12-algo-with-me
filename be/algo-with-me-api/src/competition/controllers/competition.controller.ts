import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { CompetitionService } from '../services/competition.service';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get('problems/:id')
  findOne(@Param('id') id: number) {
    return this.competitionService.findOneProblem(id);
  }

  @Post('submissions')
  @UsePipes(new ValidationPipe({ transform: true }))
  createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.competitionService.scoreSubmission(createSubmissionDto);
  }
}
