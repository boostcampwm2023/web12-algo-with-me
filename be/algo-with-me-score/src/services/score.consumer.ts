import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';

import fs from 'node:fs';
import * as process from 'process';

import { Submission } from '../entities/submission.entity';
import { RESULT } from '../entities/submission.enums';
import ICoderunResponse from '../interfaces/coderun-response.interface';
import IScoreResult from '../interfaces/score-result.interface';

@Processor('testQueue')
export class SubmissionConsumer {
  constructor(
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
  ) {}
  private readonly logger = new Logger(SubmissionConsumer.name);

  @Process('score')
  async getMessageQueue(job: Job) {
    this.logger.debug(JSON.stringify(job.data));
    this.logger.debug(`submissionId: ${job.data.submissionId}`);

    const submissionId = job.data.submissionId;
    const submission = await this.submissionRepository.findOneBy({ id: submissionId });

    const { competitionId, userId, problemId } = this.getIds(submission);
    this.writeSubmittedCodeToFilesystem(competitionId, userId, problemId, submission);

    // codeRunResult와 testcase의 result를 비교하여, 채점 결과 도출.
    // 채점 결과를 아래 sendJudgment에 보내줌
    const scoreResults: IScoreResult[] = [];
    for (let testcaseNo = 0; testcaseNo < submission.problem.testcaseNum; testcaseNo++) {
      await this.score(submissionId, competitionId, userId, problemId, testcaseNo, scoreResults);
    }

    await this.sendScoreResults(submissionId, scoreResults);
  }

  private getIds(submission: Submission) {
    // submission에 competitionId와 userId가 있어야 할듯 해요
    const competitionId = 1;
    const userId = 2;
    const problemId = submission.problem.id;
    return { competitionId, userId, problemId };
  }

  private async score(
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

  private async sendScoreResults(submissionId: number, codeRunResult: IScoreResult[]) {
    // API 서버에게 fetch
    // API 정하기 필요
    await fetch(`http://localhost:3000/___UNKNOWN_API___`, {
      method: 'POST',
      body: JSON.stringify({
        submissionId,
        codeRunResult,
      }),
    });
  }

  private getCodeRunOutputs(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseNo: number,
  ): { result: string; stdout: string; stderr: string } {
    // testcase 번호도 읽는 방식으로 바꿔야 함.
    // 이를 위해서는 docker에서 파일을 쓰는 경로도 바꿔야 함
    const submissionBasePath = `${process.env.SUBMISSION_PATH}/${competitionId}/${userId}/`;
    const result = fs.readFileSync(`${submissionBasePath}/${problemId}.result`).toString();
    const stdout = fs.readFileSync(`${submissionBasePath}/${problemId}.stdout`).toString();
    const stderr = fs.readFileSync(`${submissionBasePath}/${problemId}.stderr`).toString();
    return { result, stdout, stderr };
  }

  private async runCode(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseNo: number,
  ): Promise<ICoderunResponse> {
    // 도커 컨테이너에게 fetch
    // testcaseNo도 넘겨주는 식으로 바꿔야 할듯, 현재 docker 구현은 아래 3개만 넘겨주는 것으로 되어 있음
    const response = await fetch(`http://localhost:2000/${competitionId}/${userId}/${problemId}`, {
      method: 'POST',
    });
    return (await response.json()) as ICoderunResponse;
  }

  private writeSubmittedCodeToFilesystem(
    competitionId: number,
    userId: number,
    problemId: number,
    submission: Submission,
  ) {
    // code와 frameCode를 어떻게 합칠 것인지 약속해야 함
    const mergedCode = this.getMergedCode(submission.code, submission.problem.frameCode);
    fs.writeFileSync(
      `${process.env.SUBMISSION_PATH}/${competitionId}/${userId}/${problemId}`,
      mergedCode,
    );
  }

  private getMergedCode(code: string, frameCode: string) {
    const mergedCode = code + frameCode;
    return mergedCode;
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    await job.remove();
  }
}
