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

@Processor('submission')
export class SubmissionConsumer {
  constructor(
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    private readonly filesystemService: FilesystemService,
    private readonly scoreService: ScoreService,
  ) {}

  @Process('score')
  async getMessageQueue(job: Job) {
    const logger = new Logger();
    const messageQueueItem = new MessageQueueItemDto(job.data.submissionId, job.data.sessionId);
    const submissionId = messageQueueItem.submissionId;
    const submission: Submission = await this.submissionRepository.findOneBy({ id: submissionId });
    if (!submission)
      throw new InternalServerErrorException(
        `제출 id ${submissionId}에 해당하는 제출 정보를 찾을 수 없습니다`,
      );
    const problemId = submission.problemId;
    const competitionId = submission.competitionId;
    // TODO: userId 가져오기
    const userId = 1;
    logger.debug(JSON.stringify({ problemId, competitionId, userId }));

    await this.filesystemService.writeSubmittedCode(
      submission.code,
      competitionId,
      userId,
      problemId,
    );

    logger.debug('씀');

    await this.scoreService.scoreAllAndSendResult(
      submission,
      submissionId,
      competitionId,
      userId,
      problemId,
    );
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    await job.remove();
  }
}
