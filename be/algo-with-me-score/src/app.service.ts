import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { MessageQueueItemDto } from './score/dtos/message-queue-item.dto';

@Injectable()
export class AppService {
  constructor(@InjectQueue(process.env.REDIS_MESSAGE_QUEUE_NAME) private testQueue: Queue) {}

  async addMessageQueue(item: MessageQueueItemDto) {
    return await this.testQueue.add('score', item);
  }
}
