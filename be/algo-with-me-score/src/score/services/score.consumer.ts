import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';

import { FilesystemService } from './filesystem.service';
import { ScoreService } from './score.service';
import { MessageQueueItemDto } from '../dtos/message-queue-item.dto';
import { Problem } from '../entities/problem.entity';
import { Submission } from '../entities/submission.entity';

// @Processor(process.env.REDIS_MESSAGE_QUEUE_NAME)
@Processor('submission')
export class SubmissionConsumer {
  constructor(
    @InjectRepository(Submission) private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
    private readonly filesystemService: FilesystemService,
    private readonly scoreService: ScoreService,
  ) {}

  @Process()
  async getMessageQueue(job: Job) {
    const logger = new Logger();

    logger.debug(`Redis로부터 제출 요청 받음: ${JSON.stringify(job.data)}`);
    const messageQueueItem = new MessageQueueItemDto(job.data.submissionId, job.data.socketId);
    const { socketId, submissionId } = messageQueueItem;
    const submission: Submission = await this.submissionRepository.findOneBy({ id: submissionId });
    if (!submission) {
      new Logger().error(`제출 id ${submissionId}에 해당하는 제출 정보를 찾을 수 없습니다`);
      throw new InternalServerErrorException();
    }

    const problemId = submission.problemId;
    const competitionId = submission.competitionId;
    const userId = submission.userId;

    logger.debug(`채점 시작: ${JSON.stringify({ competitionId, userId, problemId })}`);

    await this.filesystemService.writeSubmittedCode(
      submission.code,
      competitionId,
      userId,
      problemId,
    );

    const problem: Problem = await this.problemRepository.findOneBy({ id: problemId });
    await this.scoreService.scoreAllAndSendResult(
      submission,
      problem.testcaseNum,
      submissionId,
      competitionId,
      userId,
      problemId,
      socketId,
    );
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    await job.remove();
  }
}
