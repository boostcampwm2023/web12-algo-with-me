import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

import { Problem } from './entities/problem.entity';

@Injectable()
export class CompetitionService {
  constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>) {}

  async findOneProblem(id: number) {
    const problem = await this.problemRepository.findOneBy({ id });
    const fileName = id.toString() + '.md';
    const paths = path.join(process.env.PROBLEM_PATH, id.toString(), fileName);
    if (!existsSync(paths)) throw new NotFoundException('문제 파일을 찾을 수 없습니다.');
    const content = readFileSync(paths).toString();
    return {
      id: problem.id,
      title: problem.title,
      timeLimit: problem.timeLimit,
      memoryLimit: problem.memoryLimit,
      content: content,
      solutionCode: problem.solutionCode,
      testcases: '임시',
      createdAt: problem.createdAt,
    };
  }
}
