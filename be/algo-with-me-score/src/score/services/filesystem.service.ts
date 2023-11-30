import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as fs from 'node:fs';
import * as path from 'node:path';

import { Problem } from '../entities/problem.entity';

export class FilesystemService {
  constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>) {}

  async writeSubmittedCode(code: string, competitionId: number, userId: number, problemId: number) {
    const problem: Problem = await this.problemRepository.findOneBy({ id: problemId });
    const mergedCode = this.getMergedCode(code, problem.frameCode);

    const baseDirectory = this.getSubmissionBaseDirectoryPath(competitionId, userId);
    if (!fs.existsSync(baseDirectory)) {
      fs.mkdirSync(baseDirectory, { recursive: true });
    }

    fs.writeFileSync(path.join(baseDirectory, `${problemId}.js`), mergedCode);
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
        `${baseDirectory}/${filename}.result`,
        `${baseDirectory}/${filename}.stdout`,
        `${baseDirectory}/${filename}.stderr`,
        `${baseDirectory}/${filename}.time`,
        `${baseDirectory}/${filename}.memory`,
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
    let result;
    if (!fs.existsSync(filepath)) {
      new Logger().error(`코드 실행 파일(${filepath})이 정상적으로 생성되지 않았습니다`);
      result = defaultOutput;
    } else {
      result = fs.readFileSync(filepath).toString();
    }
    return result;
  }

  getTestcaseAnswer(problemId: number, testcaseId: number) {
    const filepath = this.getTestcaseFilepath(problemId, testcaseId);
    if (!fs.existsSync(filepath)) {
      new Logger().error(`경로 ${filepath}에서 테스트케이스 ans 파일을 찾을 수 없습니다`);
      throw new InternalServerErrorException();
    }

    return fs.readFileSync(filepath).toString().trim();
  }

  removeCodeRunOutputs(competitionId: number, userId: number) {
    const baseDirectory = this.getSubmissionBaseDirectoryPath(competitionId, userId);
    fs.rmSync(baseDirectory, { recursive: true, force: true });
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
