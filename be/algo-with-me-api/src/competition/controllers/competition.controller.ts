import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CompetitionProblemResponseDto } from '../dto/competition.problem.response.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { CompetitionService } from '../services/competition.service';

@ApiTags('대회(competitions)')
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get('problems/:id')
  @ApiOperation({ summary: '대회 문제 상세 조회' })
  @ApiResponse({ type: CompetitionProblemResponseDto })
  findOne(@Param('id') id: number) {
    return this.competitionService.findOneProblem(id);
  }

  @Post('scores')
  @ApiOperation({
    summary: '채점 서버에서 채점 완료시 요청받을 api',
    description: '채점 서버에서 테스트케이스 별로 채점이 완료될경우 호출할 api',
  })
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
