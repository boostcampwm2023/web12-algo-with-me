import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';

import * as process from 'process';

import { FilesystemService } from './filesystem.service';
import { ScoreService } from './score.service';
import { Submission } from '../entities/submission.entity';
import IScoreResult from '../interfaces/score-result.interface';

@Processor(process.env.REDIS_MESSAGE_QUEUE_NAME)
export class SubmissionConsumer {
  constructor(
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    private readonly filesystemService: FilesystemService,
    private readonly scoreService: ScoreService,
  ) {}

  @Process('score')
  async getMessageQueue(job: Job) {
    const submissionId = job.data.submissionId;
    const submission = await this.submissionRepository.findOneBy({ id: submissionId });
    const { competitionId, userId, problemId } = this.getIds(submission);

    this.filesystemService.writeSubmittedCode(competitionId, userId, problemId, submission);

    const scoreResults = await this.scoreService.score(
      submission,
      submissionId,
      competitionId,
      userId,
      problemId,
    );

    await this.sendScoreResults(submissionId, scoreResults);
  }

  private getIds(submission: Submission) {
    const competitionId = 1;
    const userId = 2;
    const problemId = submission.problem.id;
    return { competitionId, userId, problemId };
  }

  private async sendScoreResults(submissionId: number, codeRunResult: IScoreResult[]) {
    await fetch(`http://localhost:3000/scores`, {
      method: 'POST',
      body: JSON.stringify({
        submissionId,
        codeRunResult,
      }),
    });
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    await job.remove();
  }
}
