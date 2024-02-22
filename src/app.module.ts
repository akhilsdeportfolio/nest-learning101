import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerMiddleWare } from './middlewares/logger/logger.middleware';
import { BullModule } from '@nestjs/bull';
import TestConsumer from './queue_processors/testQueue';
import { AudioProcessor } from './queue_processors/audio.processor';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({}),
    BullModule.forRoot({
      limiter: {
        max: 1,
        duration: 1000,
      },
      redis: {
        host: 'localhost', //'redis-18676.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 6379, //18676,
        username: 'default',
        password: 'MqPiqcB4Def4kK5k60YXJAD9o7EaSX6j',
      },
    }),
    BullModule.registerQueue({
      name: 'audio',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 300 }]),
    CacheModule.register({ ttl: 60000 }),
    MongooseModule.forRoot(
      //'mongodb+srv://akhil:akhil123@cluster0.gvtglx9.mongodb.net/',
      'mongodb://localhost:27017/mydatabase',
    ),
    CatsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    TestConsumer,
    AudioProcessor,
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('*');
  }
}
