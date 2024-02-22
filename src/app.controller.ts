import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('audio') private audioQueue: Queue,
  ) {}

  @Get()
  getHello(): string {
    this.audioQueue.add({ name: 'asdasdasd' });
    return this.appService.getHello();
  }
}
