import { InternalServerErrorException, Logger } from '@nestjs/common';

import * as fs from 'node:fs';

import { ScoreResultDto } from '../dtos/score-result.dto';
import { Submission } from '../entities/submission.entity';
import ICoderunResponse from '../interfaces/coderun-response.interface';

export class ScoreService {
  constructor() {}

  public async scoreAllAndSendResult(
    submission: Submission,
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
    const codeRunResponse = await this.runCode(competitionId, userId, problemId, testcaseId);

    const {
      result: codeRunOutput,
      stdout,
      stderr,
    } = this.getCodeRunOutputs(competitionId, userId, problemId, testcaseId);
    const testcaseAnswer = this.getTestcaseAnswer(problemId, testcaseId);
    const judgeResult = this.judge(codeRunResponse, codeRunOutput, testcaseAnswer);

    const scoreResult = new ScoreResultDto(
      submissionId,
      testcaseId,
      socketId,
      judgeResult,
      stdout,
      stderr,
      0,
      0,
    );
    await this.sendScoreResult(scoreResult);
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

  private async sendScoreResult(scoreResult: ScoreResultDto) {
    const [apiServerHost, apiServerPort] = [
      process.env.API_SERVER_HOST,
      process.env.API_SERVER_PORT,
    ];
    const url = `http://${apiServerHost}:${apiServerPort}/competitions/scores`;
    console.log(JSON.stringify(scoreResult));
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreResult),
      });
      console.log(result.status);
    } catch (error) {
      new Logger().error(
        `API 서버로 채점 결과를 보내는 데 실패했습니다 (POST ${url}) 원인: ${error}`,
      );
      throw new InternalServerErrorException();
    }
  }

  private async runCode(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): Promise<ICoderunResponse> {
    const [dockerServerHost, dockerServerPort] = [
      process.env.DOCKER_SERVER_HOST,
      process.env.DOCKER_SERVER_PORT,
    ];
    const url = `http://${dockerServerHost}:${dockerServerPort}/${competitionId}/${userId}/${problemId}/${testcaseId}`;
    try {
      const response = await fetch(url, { method: 'POST' });
      return (await response.json()) as ICoderunResponse;
    } catch (error) {
      new Logger().error(
        `도커 서버로 채점 요청을 보내는 데 실패했습니다 (POST ${url}) 원인: ${error}`,
      );
      throw new InternalServerErrorException();
    }
  }

  private getCodeRunOutputs(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): { result: string; stdout: string; stderr: string } {
    const submissionPath = process.env.SUBMISSION_PATH;
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
      new Logger().error(
        `${submissionBaseFilename}에 코드 실행 결과 파일들이 정상적으로 생성되지 않았습니다`,
      );
      throw new InternalServerErrorException();
    }

    const [result, stdout, stderr] = [
      fs.readFileSync(resultFilepath).toString(),
      fs.readFileSync(stdoutFilepath).toString(),
      fs.readFileSync(stderrFilepath).toString(),
    ];
    return { result, stdout, stderr };
  }

  private getTestcaseAnswer(problemId: number, testcaseId: number) {
    const testcasePath = process.env.TESTCASE_PATH;
    const filepath = `${testcasePath}/${problemId}/secrets/${testcaseId}.ans`;
    if (!fs.existsSync(filepath)) {
      new Logger().error(`경로 ${filepath}에서 테스트케이스 ans 파일을 찾을 수 없습니다`);
      throw new InternalServerErrorException();
    }

    return fs.readFileSync(filepath).toString().trim();
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
