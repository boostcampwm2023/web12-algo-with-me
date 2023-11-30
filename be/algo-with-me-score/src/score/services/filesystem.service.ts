import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as fs from 'node:fs';
import * as path from 'node:path';

import { Problem } from '../entities/problem.entity';

export class FilesystemService {
  constructor(
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    private readonly configService: ConfigService,
  ) {}

  async writeSubmittedCode(code: string, competitionId: number, userId: number, problemId: number) {
    const problem: Problem = await this.problemRepository.findOneBy({ id: problemId });
    const mergedCode = this.getMergedCode(code, problem.frameCode);

    const submissionPath = this.configService.get<string>('SUBMISSION_PATH');
    const baseDirectory = `${submissionPath}/${competitionId}/${userId}/`;

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
    const submissionPath = process.env.SUBMISSION_PATH;
    const submissionBaseFilename = `${submissionPath}/${competitionId}/${userId}/${problemId}.${testcaseId}`;
    const [resultFilepath, stdoutFilepath, stderrFilepath, timeUsageFilepath, memoryUsageFilepath] =
      [
        `${submissionBaseFilename}.result`,
        `${submissionBaseFilename}.stdout`,
        `${submissionBaseFilename}.stderr`,
        `${submissionBaseFilename}.time`,
        `${submissionBaseFilename}.memory`,
      ];
    if (
      !fs.existsSync(resultFilepath) ||
      !fs.existsSync(stdoutFilepath) ||
      !fs.existsSync(stderrFilepath) ||
      !fs.existsSync(timeUsageFilepath) ||
      !fs.existsSync(memoryUsageFilepath)
    ) {
      new Logger().error(
        `${submissionBaseFilename}에 코드 실행 결과 파일들이 정상적으로 생성되지 않았습니다`,
      );
      throw new InternalServerErrorException();
    }

    const [result, stdout, stderr, timeUsage, memoryUsage] = [
      fs.readFileSync(resultFilepath).toString(),
      fs.readFileSync(stdoutFilepath).toString(),
      fs.readFileSync(stderrFilepath).toString(),
      parseInt(fs.readFileSync(timeUsageFilepath).toString()),
      parseInt(fs.readFileSync(memoryUsageFilepath).toString()),
    ];
    return { result, stdout, stderr, timeUsage, memoryUsage };
  }

  getTestcaseAnswer(problemId: number, testcaseId: number) {
    const testcasePath = process.env.TESTCASE_PATH;
    const filepath = `${testcasePath}/${problemId}/secrets/${testcaseId}.ans`;
    if (!fs.existsSync(filepath)) {
      new Logger().error(`경로 ${filepath}에서 테스트케이스 ans 파일을 찾을 수 없습니다`);
      throw new InternalServerErrorException();
    }

    return fs.readFileSync(filepath).toString().trim();
  }
}
