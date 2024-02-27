import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Language } from './language.entity';
import { Problem } from './problem.entity';

@Entity()
export class ProblemLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Language, (language) => language.problemLanguages, {
    nullable: false,
  })
  language: Language;

  @ManyToOne(() => Problem, (problem) => problem.problemLanguages, { nullable: false })
  problem: Problem;

  @CreateDateColumn()
  createdAt: Date;
}
