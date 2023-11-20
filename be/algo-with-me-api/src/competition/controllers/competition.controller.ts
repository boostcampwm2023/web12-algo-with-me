import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CompetitionProblemResponseDto } from '../dto/competition.problem.response.dto';
import { CreateCompetitionDto } from '../dto/create-competition.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { UpdateCompetitionDto } from '../dto/update-competition.dto';
import { CompetitionService } from '../services/competition.service';

import { CompetitionResponseDto } from '@src/competition/dto/competition.response.dto';

@ApiTags('대회(competitions)')
@Controller('competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get('/:id')
  @ApiOperation({
    summary: '대회 정보 조회',
    description: 'URL의 파라미터(`/:id`)로 주어진 대회 id에 해당하는 대회 정보를 조회한다.',
  })
  @ApiResponse({ type: CompetitionResponseDto })
  async findOne(@Param('id') id: number) {
    return await this.competitionService.findOne(id);
  }

  @Post('/')
  @ApiOperation({
    summary: '대회 생성',
    description: `주어진 대회 관련 정보를 이용해 대회를 생성한다.`,
  })
  @ApiResponse({ type: CompetitionResponseDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCompetitionDto: CreateCompetitionDto) {
    return this.competitionService.create(createCompetitionDto);
  }

  @Put('/:id')
  @ApiOperation({
    summary: '대회 정보 수정',
    description: `URL의 파라미터(\`/:id\`)로 주어진 대회 id에 해당하는 대회 정보를 수정한다. request JSON 중 **수정하기를 원하는 것만** key: value 형식으로 요청한다.`,
  })
  @ApiResponse({})
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() updateCompetitionDto: UpdateCompetitionDto) {
    return this.competitionService.update(id, updateCompetitionDto);
  }

  @Get('problems/:id')
  @ApiOperation({ summary: '대회 문제 상세 조회' })
  @ApiResponse({ type: CompetitionProblemResponseDto })
  findOneProblem(@Param('id') id: number) {
    return this.competitionService.findOneProblem(id);
  }

  @Post('scores')
  @ApiOperation({
    summary: '[백엔드 전용] 채점 서버에서 채점 완료시 요청받을 api',
    description:
      '**[프론트엔드에서는 사용되지 않음. 백엔드에서만 사용됨]** 채점 서버에서 테스트케이스 별로 채점이 완료될경우 호출할 api',
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
