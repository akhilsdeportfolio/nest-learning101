import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  @Process()
  async roll(job: Job<unknown>) {
    Logger.log('Audio', 'info');
    Logger.log(job.toJSON(), 'debug');
  }
}
