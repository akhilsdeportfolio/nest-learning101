import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('test')
export default class TestConsumer {
  @Process()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async encode(job: Job<unknown>) {}
  @OnQueueCompleted()
  async completed(job: Job<unknown>) {
    // await job.remove();
    Logger.log(job.toJSON(), 'info');
  }
}
