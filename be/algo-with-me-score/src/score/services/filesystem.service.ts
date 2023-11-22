import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import fs from 'node:fs';
import process from 'process';

import { Problem } from '../entities/problem.entity';

export class FilesystemService {
  constructor(private readonly problemRepository: Repository<Problem>) {}

  public writeSubmittedCode(competitionId: number, userId: number, problemId: number) {
    // TODO: code와 프레임코드 조인해서 가져오기
    const code = '';
    const frameCode = '';
    const mergedCode = this.getMergedCode(code, frameCode);
    const filepath = `${process.env.SUBMISSION_PATH}/${competitionId}/${userId}/${problemId}`;
    if (!fs.existsSync(filepath))
      throw new InternalServerErrorException(`경로 ${filepath}가 없습니다`);
    fs.writeFileSync(filepath, mergedCode);
  }

  private getMergedCode(code: string, frameCode: string) {
    const mergedCode = code + frameCode;
    return mergedCode;
  }
}
