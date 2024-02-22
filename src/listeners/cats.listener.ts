import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CatsListner {
  @OnEvent('get_cats')
  run(event: any) {
    console.log('Event::::::;', event);
  }
}
