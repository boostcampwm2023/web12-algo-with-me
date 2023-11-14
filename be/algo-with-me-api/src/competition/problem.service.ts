import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { readFileSync } from 'fs';
import * as path from 'path';

import { CreateProblemDto } from './dto/create-problem.dto';
import { Problem } from './entities/problem.entity';

@Injectable()
export class ProblemService {
  constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>) {}

  create(createProblemDto: CreateProblemDto) {
    console.log(createProblemDto.toEntity());
    const problem: Problem = createProblemDto.toEntity();

    const savedProblem = this.problemRepository.save(problem);
    return savedProblem;
  }

  async findAll() {
    const problems = await this.problemRepository.find();
    return problems.map((problem: Problem) => {
      return {
        id: problem.id,
        title: problem.title,
      };
    });
  }

  async findOne(id: number) {
    const problem = await this.problemRepository.findOneBy({ id });
    const fileName = id.toString() + '.md';
    const paths = path.join(process.env.PROBLEM_PATH, id.toString(), fileName);
    console.log(paths);
    const content = readFileSync(paths).toString();
    return {
      id: problem.id,
      title: problem.title,
      timeLimit: problem.timeLimit,
      memoryLimit: problem.memoryLimit,
      content: content,
      createdAt: problem.createdAt,
    };
  }

  // update(id: number, updateCompetitionDto: UpdateCompetitionDto) {
  //   return `This action updates a #${id} competition`;
  // }

  remove(id: number) {
    this.problemRepository.delete({ id });
  }
}
