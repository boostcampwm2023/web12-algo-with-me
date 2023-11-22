import { InternalServerErrorException, Logger } from '@nestjs/common';

import fs from 'node:fs';
import process from 'process';

import { ScoreResultDto } from '../dtos/score-result.dto';
import { Submission } from '../entities/submission.entity';
import { RESULT } from '../entities/submission.enums';
import ICoderunResponse from '../interfaces/coderun-response.interface';

export class ScoreService {
  public async scoreAllAndSendResult(
    submission: Submission,
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
  ) {
    for (let testcaseId = 1; testcaseId <= submission.problem.testcaseNum; testcaseId++) {
      await this.scoreOneTestcaseAndSendResult(
        submissionId,
        competitionId,
        userId,
        problemId,
        testcaseId,
      );
    }
  }

  private async scoreOneTestcaseAndSendResult(
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ) {
    const codeRunResponse = await this.runCode(competitionId, userId, problemId, testcaseId);

    const {
      result: codeRunOutput,
      stdout,
      stderr,
    } = this.getCodeRunOutputs(competitionId, userId, problemId, testcaseId);
    const testcaseAnswer = this.getTestcaseAnswer(problemId, testcaseId);
    const judgeResult = this.judge(codeRunResponse, codeRunOutput, testcaseAnswer);

    await this.sendScoreResult(
      new ScoreResultDto(
        submissionId,
        competitionId,
        userId,
        problemId,
        testcaseId,
        judgeResult,
        stdout,
        stderr,
        0,
        0,
      ),
    );
  }

  private async sendScoreResult(scoreResult: ScoreResultDto) {
    const logger = new Logger();
    logger.debug(JSON.stringify(scoreResult));
    await fetch(
      `http://${process.env.API_SERVER_HOST}:${process.env.API_SERVER_PORT}/competitions/scores`,
      {
        method: 'POST',
        body: JSON.stringify(scoreResult),
      },
    );
  }

  private async runCode(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): Promise<ICoderunResponse> {
    const response = await fetch(
      `http://localhost:2000/${competitionId}/${userId}/${problemId}/${testcaseId}`,
      { method: 'POST' },
    );
    return (await response.json()) as ICoderunResponse;
  }

  private getCodeRunOutputs(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): { result: string; stdout: string; stderr: string } {
    const submissionBaseFilename = `${process.env.SUBMISSION_PATH}/${competitionId}/${userId}/${problemId}.${testcaseId}`;
    const [resultFilepath, stdoutFilepath, stderrFilepath] = [
      `${submissionBaseFilename}.result`,
      `${submissionBaseFilename}.stdout`,
      `${submissionBaseFilename}.stderr`,
    ];
    if (
      !fs.existsSync(resultFilepath) ||
      !fs.existsSync(stdoutFilepath) ||
      !fs.existsSync(stderrFilepath)
    ) {
      throw new InternalServerErrorException(
        `${submissionBaseFilename}에 코드 실행 결과 파일들이 정상적으로 생성되지 않았습니다`,
      );
    }

    const [result, stdout, stderr] = [
      fs.readFileSync(resultFilepath).toString(),
      fs.readFileSync(stdoutFilepath).toString(),
      fs.readFileSync(stderrFilepath).toString(),
    ];
    return { result, stdout, stderr };
  }

  private getTestcaseAnswer(problemId: number, testcaseId: number) {
    const filepath = `${process.env.TESTCASE_PATH}/${problemId}/secrets/${testcaseId}.ans`;
    if (!fs.existsSync(filepath))
      throw new InternalServerErrorException(
        `경로 ${filepath}에서 테스트케이스 ans 파일을 찾을 수 없습니다`,
      );
    const testcaseAnswer = fs.readFileSync(filepath).toString();
    return testcaseAnswer;
  }

  private judge(
    codeRunResponse: ICoderunResponse,
    codeRunOutput: string,
    testcaseAnswer: string,
  ): keyof typeof RESULT {
    if (codeRunResponse.result === 'TIMEOUT') {
      return 'TIMEOUT';
    } else if (codeRunResponse.result !== 'SUCCESS') {
      return 'WRONG';
    } else if (codeRunOutput === testcaseAnswer) {
      return 'CORRECT';
    } else {
      return 'WRONG';
    }
  }
}
