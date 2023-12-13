import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { MessageQueueItemDto } from './score/dtos/message-queue-item.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addMessage(@Body('submissionId') submissionId: number, @Body('socketId') socketId: string) {
    return this.appService.addMessageQueue(new MessageQueueItemDto(submissionId, socketId));
  }
}
