import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addMessage(@Body('submissionId') submissionId: number) {
    return this.appService.addMessageQueue(submissionId);
  }
}
