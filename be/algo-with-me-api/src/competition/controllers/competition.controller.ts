import { Controller, Get, Param } from '@nestjs/common';

import { CompetitionService } from '../services/competition.service';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get('problems/:id')
  findOne(@Param('id') id: number) {
    return this.competitionService.findOneProblem(id);
  }
}
