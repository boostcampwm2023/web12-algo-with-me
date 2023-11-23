import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import fs from 'node:fs';
import process from 'process';

import { ScoreResultDto } from '../dtos/score-result.dto';
import { Submission } from '../entities/submission.entity';
import { RESULT } from '../entities/submission.enums';
import ICoderunResponse from '../interfaces/coderun-response.interface';

export class ScoreService {
  constructor(private readonly configService: ConfigService) {}

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
    const [apiServerHost, apiServerPort] = [
      this.configService.get<string>('API_SERVER_HOST'),
      this.configService.get<string>('API_SERVER_PORT'),
    ];
    const url = `http://${apiServerHost}:${apiServerPort}/competitions/scores`;
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(scoreResult),
      });
    } catch (error) {
      const message = `API 서버로 채점 결과를 보내는 데 실패했습니다 (POST ${url})`;
      new Logger().error(message);
      throw new InternalServerErrorException(message);
    }
  }

  private async runCode(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): Promise<ICoderunResponse> {
    const url = `http://localhost:2000/${competitionId}/${userId}/${problemId}/${testcaseId}`;
    try {
      const response = await fetch(url, { method: 'POST' });
      return (await response.json()) as ICoderunResponse;
    } catch (error) {
      const message = `도커 서버로 채점 요청을 보내는 데 실패했습니다 (POST ${url})`;
      new Logger().error(message);
      throw new InternalServerErrorException(message);
    }
  }

  private getCodeRunOutputs(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): { result: string; stdout: string; stderr: string } {
    const submissionPath = this.configService.get<string>('SUBMISSION_PATH');
    const submissionBaseFilename = `${submissionPath}/${competitionId}/${userId}/${problemId}.${testcaseId}`;
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
      const message = `${submissionBaseFilename}에 코드 실행 결과 파일들이 정상적으로 생성되지 않았습니다`;
      new Logger().error(message);
      throw new InternalServerErrorException(message);
    }

    const [result, stdout, stderr] = [
      fs.readFileSync(resultFilepath).toString(),
      fs.readFileSync(stdoutFilepath).toString(),
      fs.readFileSync(stderrFilepath).toString(),
    ];
    return { result, stdout, stderr };
  }

  private getTestcaseAnswer(problemId: number, testcaseId: number) {
    const testcasePath = this.configService.get<string>('TESTCASE_PATH');
    const filepath = `${testcasePath}/${problemId}/secrets/${testcaseId}.ans`;
    if (!fs.existsSync(filepath)) {
      const message = `경로 ${filepath}에서 테스트케이스 ans 파일을 찾을 수 없습니다`;
      new Logger().error(message);
      throw new InternalServerErrorException(message);
    }

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
