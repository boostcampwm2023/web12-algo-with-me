import fs from 'node:fs';
import process from 'process';

import { Submission } from '../entities/submission.entity';
import { RESULT } from '../entities/submission.enums';
import ICoderunResponse from '../interfaces/coderun-response.interface';
import IScoreResult from '../interfaces/score-result.interface';

export class ScoreService {
  public async score(
    submission: Submission,
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
  ) {
    const scoreResults: IScoreResult[] = [];
    for (let testcaseNo = 0; testcaseNo < submission.problem.testcaseNum; testcaseNo++) {
      await this.scoreOneTestcase(
        submissionId,
        competitionId,
        userId,
        problemId,
        testcaseNo,
        scoreResults,
      );
    }
    return scoreResults;
  }

  private async scoreOneTestcase(
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseNo: number,
    scoreResults: IScoreResult[],
  ) {
    const codeRunResponse = await this.runCode(competitionId, userId, problemId, testcaseNo);

    const {
      result: codeRunOutput,
      stdout,
      stderr,
    } = this.getCodeRunOutputs(competitionId, userId, problemId, testcaseNo);
    const testcaseAnswer = this.getTestcaseAnswer(problemId, testcaseNo);
    const scoreResult = this.judge(codeRunResponse, codeRunOutput, testcaseAnswer);

    scoreResults.push({
      submissionId,
      competitionId,
      userId,
      problemId,
      testcaseNo,
      result: scoreResult,
      stdout,
      stderr,
      timeUsage: null,
      memoryUsage: null,
    });
  }

  private async runCode(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseNo: number,
  ): Promise<ICoderunResponse> {
    const response = await fetch(`http://localhost:2000/${competitionId}/${userId}/${problemId}`, {
      method: 'POST',
    });
    return (await response.json()) as ICoderunResponse;
  }

  private getCodeRunOutputs(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseNo: number,
  ): { result: string; stdout: string; stderr: string } {
    const submissionBasePath = `${process.env.SUBMISSION_PATH}/${competitionId}/${userId}/`;
    const result = fs.readFileSync(`${submissionBasePath}/${problemId}.result`).toString();
    const stdout = fs.readFileSync(`${submissionBasePath}/${problemId}.stdout`).toString();
    const stderr = fs.readFileSync(`${submissionBasePath}/${problemId}.stderr`).toString();
    return { result, stdout, stderr };
  }

  private getTestcaseAnswer(problemId: number, testcaseNo: number) {
    const testcaseAnswer = fs
      .readFileSync(`${process.env.TESTCASE_PATH}/${problemId}/secrets/${testcaseNo}.ans`)
      .toString();
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
