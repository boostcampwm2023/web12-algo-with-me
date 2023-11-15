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
    // console.log(await job.progress(100));
    // console.log(await job.moveToCompleted());
    // console.log(await job.remove());
    return { good: 'good' };
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<unknown>, result: any) {
    await job.remove();
    console.log('job done');
    console.log(job);
    console.log(result);
  }
}
