import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addMessage(@Body('data') data: number) {
    return this.appService.addMessageQueue(data);
  }
}
