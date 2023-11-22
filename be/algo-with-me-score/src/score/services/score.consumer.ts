import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';

import * as process from 'process';

import { FilesystemService } from './filesystem.service';
import { ScoreService } from './score.service';
import { MessageQueueItemDto } from '../dtos/message-queue-item.dto';
import { Submission } from '../entities/submission.entity';

// @Processor(process.env.REDIS_MESSAGE_QUEUE_NAME)
@Processor('testQueue')
export class SubmissionConsumer {
  constructor(
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    private readonly filesystemService: FilesystemService,
    private readonly scoreService: ScoreService,
  ) {}

  @Process('score')
  async getMessageQueue(job: Job) {
    const messageQueueItem = new MessageQueueItemDto(
      job.data.submissionId,
      job.data.problemId,
      job.data.sessionId,
    );
    const logger = new Logger();
    const submissionId = messageQueueItem.submissionId;
    const submission = await this.submissionRepository.findOneBy({ id: submissionId });
    if (!submission)
      throw new InternalServerErrorException(
        `제출 id ${submissionId}에 해당하는 제출 정보를 찾을 수 없습니다`,
      );
    const { competitionId, userId, problemId } = this.getIds(submission);

    this.filesystemService.writeSubmittedCode(competitionId, userId, problemId);

    await this.scoreService.scoreAllAndSendResult(
      submission,
      submissionId,
      competitionId,
      userId,
      problemId,
    );
  }

  private getIds(submission: Submission) {
    // TODO: submission으로부터 competitionId, problemId, userId를 받을 수 있어야 함
    const competitionId = 1;
    const userId = 1;
    const problemId = 1;
    return { competitionId, userId, problemId };
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    await job.remove();
  }
}
