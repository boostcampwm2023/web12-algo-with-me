import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(process.env.REDIS_MESSAGE_QUEUE_NAME)
export class SubmissionConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log(job.data);
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
    return { good: 'good' };
  }

  @OnQueueCompleted()
  onCompleted(job: Job<unknown>, result: any) {
    console.log('job done');
    console.log(result);
    // redis 에서 데이터 삭제
    job.remove();
  }
}
