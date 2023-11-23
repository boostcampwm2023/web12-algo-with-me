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
      new Logger().error(`파일시스템에 ${baseDirectory} 경로가 존재하지 않습니다`);
      throw new InternalServerErrorException();
    }

    fs.writeFileSync(path.join(baseDirectory, `${problemId}.js`), mergedCode);
  }

  private getMergedCode(code: string, frameCode: string) {
    // TODO: 프레임코드
    const mergedCode = code + frameCode;
    return mergedCode;
  }
}
