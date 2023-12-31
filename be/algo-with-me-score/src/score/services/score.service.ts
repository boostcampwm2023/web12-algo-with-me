import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { FetchService } from './fetch.service';
import { FilesystemService } from './filesystem.service';
import PromisePool from './promise-pool.service';
import { ScoreResultDto } from '../dtos/score-result.dto';
import { Problem } from '../entities/problem.entity';
import ICoderunResponse from '../interfaces/coderun-response.interface';

@Injectable()
export class ScoreService {
  constructor(
    private readonly filesystemService: FilesystemService,
    private readonly fetchService: FetchService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public async scoreAllAndSendResult(
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
    socketId: string,
    problem: Problem,
  ) {
    const promisePool = new PromisePool(parseInt(process.env.DOCKER_CONTAINER_COUNT), this.logger);
    for (let testcaseId = 1; testcaseId <= problem.testcaseNum; testcaseId++) {
      await promisePool.add(this.scoreOneTestcaseAndSendResult.bind(this), {
        submissionId,
        competitionId,
        userId,
        problemId,
        testcaseId,
        socketId,
        problem,
      });
    }
  }

  private async scoreOneTestcaseAndSendResult(args: {
    submissionId: number;
    competitionId: number;
    userId: number;
    problemId: number;
    testcaseId: number;
    containerId: number;
    socketId: string;
  }) {
    const codeRunResponse: ICoderunResponse = await this.fetchService.requestDockerServerToRunCode(
      args.competitionId,
      args.userId,
      args.problemId,
      args.testcaseId,
      args.containerId,
    );

    const {
      result: codeRunOutput,
      stdout,
      stderr,
      timeUsage,
      memoryUsage,
    } = this.filesystemService.getCodeRunOutputs(
      args.competitionId,
      args.userId,
      args.problemId,
      args.testcaseId,
    );
    const testcaseAnswer = this.filesystemService.getTestcaseAnswer(
      args.problemId,
      args.testcaseId,
    );
    if (!testcaseAnswer) return;
    const judgeResult = this.judge(
      codeRunResponse,
      codeRunOutput,
      testcaseAnswer,
      memoryUsage,
      args,
    );

    const scoreResult = new ScoreResultDto(
      args.submissionId,
      args.testcaseId,
      args.socketId,
      judgeResult,
      stdout,
      stderr,
      timeUsage,
      memoryUsage,
    );
    await this.fetchService.sendScoreResultToApiServer(scoreResult);
  }

  private judge(
    codeRunResponse: ICoderunResponse,
    codeRunOutput: string,
    testcaseAnswer: string,
    memoryUsage: number,
    args?: { [keys: number | string]: any },
  ): '처리중' | '정답입니다' | '오답입니다' | '시간초과' | '메모리초과' {
    this.logger.debug(
      `실행 결과: ${codeRunResponse.result}, 제출한 답안: ${codeRunOutput}, 정답: ${testcaseAnswer}, submissionId=${args.submissionId}, competitionId=${args.competitionId}, userId=${args.userId}, problemId=${args.problemId}, testcaseId=${args.testcaseId}, containerId=${args.containerId}`,
    );
    if (codeRunResponse.result === 'TIMEOUT') {
      return '시간초과';
    } else if (memoryUsage > args.problem.memoryLimit) {
      return '메모리초과';
    } else if (codeRunResponse.result !== 'SUCCESS') {
      return '오답입니다';
    } else if (codeRunOutput === testcaseAnswer) {
      return '정답입니다';
    } else {
      return '오답입니다';
    }
  }
}
