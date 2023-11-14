import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.problemRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} competition`;
  // }

  // update(id: number, updateCompetitionDto: UpdateCompetitionDto) {
  //   return `This action updates a #${id} competition`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} competition`;
  // }
}
