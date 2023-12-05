import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';

import * as fs from 'node:fs';
import * as path from 'node:path';

import { Problem } from '../entities/problem.entity';

@Injectable()
export class FilesystemService {
  constructor(
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async writeSubmittedCode(code: string, competitionId: number, userId: number, problem: Problem) {
    const mergedCode = this.getMergedCode(code, problem.frameCode);

    const baseDirectory = this.getSubmissionBaseDirectoryPath(competitionId, userId);
    try {
      if (!fs.existsSync(baseDirectory)) {
        fs.mkdirSync(baseDirectory, { recursive: true });
      }
    } catch (error) {
      this.logger.error(error);
      return false;
    }

    const codeFilepath = path.join(baseDirectory, `${problem.id}.js`);
    try {
      fs.writeFileSync(codeFilepath, mergedCode);
    } catch (error) {
      this.logger.error(`실행 가능한 코드 파일(${codeFilepath})이 쓰이지 않았습니다`);
      return false;
    }
    return true;
  }

  private getMergedCode(code: string, frameCode: string) {
    return frameCode.replace('${0}', code);
  }

  getCodeRunOutputs(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): { result: string; stdout: string; stderr: string; timeUsage: number; memoryUsage: number } {
    const baseDirectory = this.getSubmissionBaseDirectoryPath(competitionId, userId);
    const filename = `${problemId}.${testcaseId}`;
    const [resultFilepath, stdoutFilepath, stderrFilepath, timeUsageFilepath, memoryUsageFilepath] =
      [
        path.join(baseDirectory, `${filename}.result`),
        path.join(baseDirectory, `${filename}.stdout`),
        path.join(baseDirectory, `${filename}.stderr`),
        path.join(baseDirectory, `${filename}.time`),
        path.join(baseDirectory, `${filename}.memory`),
      ];

    return {
      result: this.getCodeRunOutput(resultFilepath, 'Internal Server Error'),
      stdout: this.getCodeRunOutput(stdoutFilepath, 'Internal Server Error'),
      stderr: this.getCodeRunOutput(stderrFilepath, 'Internal Server Error'),
      timeUsage: parseInt(this.getCodeRunOutput(timeUsageFilepath, '0')),
      memoryUsage: parseInt(this.getCodeRunOutput(memoryUsageFilepath, '0')),
    };
  }

  private getCodeRunOutput(filepath: string, defaultOutput?: string) {
    let result: string;
    if (!fs.existsSync(filepath)) {
      this.logger.error(`코드 실행 파일(${filepath})이 정상적으로 생성되지 않았습니다`);
      result = defaultOutput;
    } else {
      result = fs.readFileSync(filepath).toString();
    }
    return result;
  }

  getTestcaseAnswer(problemId: number, testcaseId: number) {
    const filepath = this.getTestcaseFilepath(problemId, testcaseId);
    if (!fs.existsSync(filepath)) {
      this.logger.error(`경로 ${filepath}에서 테스트케이스 ans 파일을 찾을 수 없습니다`);
      return undefined;
    }

    return fs.readFileSync(filepath).toString().trim();
  }

  removeCodeRunOutputs(competitionId: number, userId: number) {
    const baseDirectory = this.getSubmissionBaseDirectoryPath(competitionId, userId);
    try {
      fs.rmSync(baseDirectory, { recursive: true });
    } catch (e) {
      this.logger.warn(`코드 실행 전 ${baseDirectory}를 삭제하는 데 실패했습니다`);
    }
  }

  private getSubmissionBaseDirectoryPath(competitionId: number, userId: number) {
    const submissionPath = process.env.SUBMISSION_PATH;
    return `${submissionPath}/${competitionId}/${userId}/`;
  }

  private getTestcaseFilepath(problemId: number, testcaseId: number) {
    const testcasePath = process.env.TESTCASE_PATH;
    return `${testcasePath}/${problemId}/secrets/${testcaseId}.ans`;
  }
}
