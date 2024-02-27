import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

import { CreateProblemDto } from '../dto/create-problem.dto';
import { ProblemResponseDto } from '../dto/problem.response.dto';
import { ProblemSimpleResponseDto } from '../dto/problem.simple.response.dto';
import { Problem } from '../entities/problem.entity';
import { LANGUAGES, IParameter, LanguagesMetadata } from '../language.enums';

@Injectable()
export class ProblemService {
  constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>) {}

  async create(createProblemDto: CreateProblemDto) {
    const problem: Problem = createProblemDto.toEntity();

    const savedProblem = await this.problemRepository.save(problem);
    return ProblemResponseDto.from(savedProblem, '');
  }

  async findAll() {
    const problems = await this.problemRepository.find();
    return problems.map((problem: Problem) => {
      return new ProblemSimpleResponseDto(problem.id, problem.title);
    });
  }

  async findOne(id: number): Promise<ProblemResponseDto> {
    const problem = await this.problemRepository.findOneBy({ id });
    const fileName = id.toString() + '.md';
    const paths = path.join(process.env.PROBLEM_PATH, fileName);
    if (!existsSync(paths)) throw new NotFoundException('문제 파일을 찾을 수 없습니다.');
    const content = readFileSync(paths).toString();
    return ProblemResponseDto.from(problem, content);
  }

  async getProblemTestcaseNum(id: number) {
    const problem = await this.problemRepository.findOneBy({ id });
    return problem.testcaseNum;
  }

  generateSolutionCode(
    language: keyof typeof LANGUAGES,
    inputs: IParameter[],
    output: IParameter,
  ): string {
    const inputParams = this.getInputParams(inputs);
    const parameterDescriptions = this.getParameterDescriptions(inputs, language);
    const returnStatement = this.getSolutionCodeReturnStatement(output, language);
    switch (language) {
      case LANGUAGES.JavaScript:
        return `function solution(${inputParams}) {\n${parameterDescriptions}\n${returnStatement}\n}\n`;
      case LANGUAGES.Python3:
        return `def solution(${inputParams}):\n${parameterDescriptions}\n${returnStatement}\n`;
      default:
        throw new Error(`${language} 언어는 지원하지 않는 프로그래밍 언어입니다`);
    }
  }

  private getInputParams(inputs: IParameter[]): string {
    return inputs.map((x) => x.name).join(', ');
  }

  private getParameterDescriptions(inputs: IParameter[], language: keyof typeof LANGUAGES) {
    const languageMetadata = LanguagesMetadata[language];
    return inputs
      .map(
        (x) => `${languageMetadata.indent}${languageMetadata.oneLineComment} ${x.name}: ${x.type}`,
      )
      .join(`\n`);
  }

  private getSolutionCodeReturnStatement(
    output: IParameter,
    language: keyof typeof LANGUAGES,
  ): string {
    let result = this.getDefaultReturnValue(output, language);
    const languageMetadata = LanguagesMetadata[language];
    for (const char of output.type) {
      if (char === '[') {
        result = `[${result}]`;
      }
    }
    result = `${languageMetadata.indent}return ${result}${languageMetadata.endOfSentence}`;
    return result;
  }

  private getDefaultReturnValue(output: IParameter, language: keyof typeof LANGUAGES): string {
    let result: string;
    const languageMetadata = LanguagesMetadata[language];
    if (output.type.startsWith('integer')) {
      result = languageMetadata.integerDefaultValue;
    } else if (output.type.startsWith('string')) {
      result = languageMetadata.stringDefaultValue;
    } else if (output.type.startsWith('boolean')) {
      result = languageMetadata.booleanDefaultValue;
    }
    return result;
  }

  // update(id: number, updateCompetitionDto: UpdateCompetitionDto) {
  //   return `This action updates a #${id} competition`;
  // }

  remove(id: number) {
    this.problemRepository.delete({ id });
  }
}
