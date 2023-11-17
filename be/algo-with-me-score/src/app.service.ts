import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('testQueue') private testQueue: Queue) {}

  async addMessageQueue(data: number) {
    const job = await this.testQueue.add('score', { submissionId: data });
    return job;
  }
}
