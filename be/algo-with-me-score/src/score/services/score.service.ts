import { Logger } from '@nestjs/common';

import { FetchService } from './fetch.service';
import { FilesystemService } from './filesystem.service';
import { ScoreResultDto } from '../dtos/score-result.dto';
import { Submission } from '../entities/submission.entity';
import ICoderunResponse from '../interfaces/coderun-response.interface';

export class ScoreService {
  constructor(
    private readonly filesystemService: FilesystemService,
    private readonly fetchService: FetchService,
  ) {}

  public async scoreAllAndSendResult(
    testcaseNum: number,
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
    socketId: string,
  ) {
    for (let testcaseId = 1; testcaseId <= testcaseNum; testcaseId++) {
      await this.scoreOneTestcaseAndSendResult(
        submissionId,
        competitionId,
        userId,
        problemId,
        testcaseId,
        socketId,
      );
    }
  }

  private async scoreOneTestcaseAndSendResult(
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
    socketId: string,
  ) {
    const codeRunResponse = await this.fetchService.requestDockerServerToRunCode(
      competitionId,
      userId,
      problemId,
      testcaseId,
    );

    const {
      result: codeRunOutput,
      stdout,
      stderr,
      timeUsage,
      memoryUsage,
    } = this.filesystemService.getCodeRunOutputs(competitionId, userId, problemId, testcaseId);
    const testcaseAnswer = this.filesystemService.getTestcaseAnswer(problemId, testcaseId);
    const judgeResult = this.judge(codeRunResponse, codeRunOutput, testcaseAnswer);

    const scoreResult = new ScoreResultDto(
      submissionId,
      testcaseId,
      socketId,
      judgeResult,
      stdout,
      stderr,
      timeUsage,
      memoryUsage,
    );
    await this.fetchService.sendScoreResultToApiServer(scoreResult);
    const logger = new Logger();
    logger.debug(
      `채점 완료: ${JSON.stringify({
        submissionId: scoreResult.submissionId,
        competitionId,
        userId,
        problemId,
        testcaseId,
        judgeResult,
      })}`,
    );
  }

  private judge(
    codeRunResponse: ICoderunResponse,
    codeRunOutput: string,
    testcaseAnswer: string,
  ): '처리중' | '정답입니다' | '오답입니다' | '시간초과' | '메모리초과' {
    new Logger().debug(
      `실행 결과: ${
        codeRunResponse.result
      }, 제출한 답안: ${codeRunOutput}(${typeof codeRunOutput}), 정답: ${testcaseAnswer}(${typeof testcaseAnswer})`,
    );
    if (codeRunResponse.result === 'TIMEOUT') {
      return '시간초과';
    } else if (codeRunResponse.result !== 'SUCCESS') {
      return '오답입니다';
    } else if (codeRunOutput === testcaseAnswer) {
      return '정답입니다';
    } else {
      return '오답입니다';
    }
  }
}
