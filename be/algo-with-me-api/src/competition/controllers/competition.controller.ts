import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { CompetitionProblemResponseDto } from '../../problem/dto/competition.problem.response.dto';
import { ProblemSimpleResponseDto } from '../../problem/dto/problem.simple.response.dto';
import { AuthUser } from '../../user/decorators/user.decorators';
import { User } from '../../user/entities/user.entity';
import { CompetitionDto } from '../dto/competition.dto';
import { IsJoinableDto } from '../dto/competition.is.joinable.dto';
import { CompetitionResponseDto } from '../dto/competition.response.dto';
import { CompetitionSimpleResponseDto } from '../dto/competition.simple-response.dto';
import { ScoreResultDto } from '../dto/score-result.dto';
import { CompetitionService } from '../services/competition.service';

@ApiTags('대회(competitions)')
@Controller('competitions')
export class CompetitionController {
  constructor(
    private readonly competitionService: CompetitionService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/')
  @ApiOperation({
    summary: '대회 정보 전체 조회',
    description: '모든 대회 정보를 조회한다.',
  })
  @ApiResponse({ type: CompetitionSimpleResponseDto })
  findAll() {
    return this.competitionService.findAll();
  }

  @Get('/:competitionId')
  @ApiOperation({
    summary: '대회 세부 정보 조회',
    description: 'URL의 파라미터(`/:id`)로 주어진 대회 id에 해당하는 대회 세부 정보를 조회한다.',
  })
  @ApiResponse({ type: CompetitionResponseDto })
  findOne(@Param('competitionId') competitionId: number) {
    return this.competitionService.findOne(competitionId);
  }

  @Post('/')
  @ApiOperation({
    summary: '대회 생성',
    description: `주어진 대회 관련 정보를 이용해 대회를 생성한다. 과도한 DB 접근을 막기 위해, 하나의 대회에서 30개가 넘는 문제를 출제할 수 없도록 정책 상 제한한다.`,
  })
  @ApiResponse({ type: CompetitionResponseDto })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard('jwt'))
  create(@Body() competitionDto: CompetitionDto, @AuthUser() user: User) {
    return this.competitionService.create(competitionDto, user);
  }

  @Put('/:competitionId')
  @ApiOperation({
    summary: '대회 정보 수정',
    description: `URL의 파라미터(\`/:id\`)로 주어진 대회 id에 해당하는 대회 정보를 수정한다. request JSON 중 **수정하기를 원하는 것만** key: value 형식으로 요청한다.`,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('competitionId') competitionId: number,
    @Body() competitionDto: CompetitionDto,
    @AuthUser() user: User,
  ) {
    this.competitionService.update(competitionId, competitionDto, user);
  }

  @Get('/:competitionId/problems')
  @ApiOperation({ summary: '대회별 문제 목록 조회' })
  @ApiResponse({ type: ProblemSimpleResponseDto, isArray: true })
  findCompetitionProblem(@Param('competitionId') competitionId: number) {
    return this.competitionService.findCompetitionProblemList(competitionId);
  }

  @Get('problems/:problemId')
  @ApiOperation({ summary: '대회 문제 상세 조회' })
  @ApiResponse({ type: CompetitionProblemResponseDto })
  async findOneProblem(@Param('problemId') problemId: number) {
    return await this.competitionService.findOneProblem(problemId);
  }

  @Post('scores')
  @ApiOperation({
    summary: '[백엔드 전용] 채점 서버에서 채점 완료시 요청받을 api',
    description:
      '**[프론트엔드에서는 사용되지 않음. 백엔드에서만 사용됨]** 채점 서버에서 테스트케이스 별로 채점이 완료될경우 호출할 api',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveScoreResult(@Body() scoreResultDto: ScoreResultDto) {
    await this.competitionService.saveScoreResult(scoreResultDto);
  }

  @Post('/:competitionId/participations')
  @ApiOperation({
    summary: '대회 참여 api',
    description: '유저가 대회에 참여하는 api 입니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async joinCompetition(@AuthUser() user: User, @Param('competitionId') competitionId: number) {
    await this.competitionService.joinCompetition(competitionId, user);
  }

  @Get('validation/:competitionId')
  @ApiOperation({
    summary: '대회 입장 가능 여부 검증',
    description: '선택한 대회 화면에 입장이 가능한지 확인하는 api 입니다.',
  })
  @ApiBearerAuth()
  @ApiResponse({ type: IsJoinableDto })
  @UseGuards(AuthGuard('jwt'))
  async checkUserCanJoinCompetition(
    @AuthUser() user: User,
    @Param('competitionId') competitionId: number,
  ) {
    return this.competitionService.checkUserCanJoinCompetition(competitionId, user);
  }

  // @Post('submissions')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
  //   return this.competitionService.scoreSubmission(createSubmissionDto);
  // }
}
