import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('testQueue')
export class AppConsumer {
  private readonly logger = new Logger(AppConsumer.name);

  @Process('task')
  getMessageQueue(job: Job) {
    this.logger.log(`${job.data}.dataId번 작업을 수행함`);
  }

  // @Process()
  // async transcode(job: Job<unknown>) {
  //   console.log(job.data);
  //   for (let i = 0; i < 10; i++) {
  //     console.log(i);
  //   }
  //   return { good: 'good' };
  // }
  //
  // @OnQueueCompleted()
  // onCompleted(job: Job<unknown>, result: any) {
  //   console.log('job done');
  //   console.log(result);
  //   // redis 에서 데이터 삭제
  //   job.remove();
  // }
}
