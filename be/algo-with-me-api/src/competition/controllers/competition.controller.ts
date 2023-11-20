import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ScoreResultDto } from '../dto/score-result.dto';
import { CompetitionService } from '../services/competition.service';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get('problems/:id')
  findOne(@Param('id') id: number) {
    return this.competitionService.findOneProblem(id);
  }

  @Post('scores')
  @UsePipes(new ValidationPipe({ transform: true }))
  saveScoreResult(@Body() scoreResultDto: ScoreResultDto) {
    this.competitionService.saveScoreResult(scoreResultDto);
  }

  // @Post('submissions')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
  //   return this.competitionService.scoreSubmission(createSubmissionDto);
  // }
}
