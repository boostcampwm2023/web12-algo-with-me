import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import fs from 'node:fs';

import { Problem } from '../entities/problem.entity';

export class FilesystemService {
  constructor(
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    private readonly configService: ConfigService,
  ) {}

  async writeSubmittedCode(code: string, competitionId: number, userId: number, problemId: number) {
    const logger = new Logger();
    const problem: Problem = await this.problemRepository.findOneBy({ id: problemId });
    const mergedCode = this.getMergedCode(code, problem.frameCode);

    const submissionPath = this.configService.get<string>('SUBMISSION_PATH');
    logger.debug(JSON.stringify(submissionPath));
    const filepath = `${submissionPath}/${competitionId}/${userId}/${problemId}`;
    logger.debug(JSON.stringify(filepath));

    if (!fs.existsSync(filepath)) {
      logger.debug('어루');
      throw new InternalServerErrorException(`경로 ${filepath}가 없습니다`);
    }
    logger.debug('?');

    fs.writeFileSync(filepath, mergedCode);
  }

  private getMergedCode(code: string, frameCode: string) {
    const mergedCode = code + frameCode;
    return mergedCode;
  }
}
