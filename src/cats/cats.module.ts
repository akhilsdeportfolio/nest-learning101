import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from 'src/schemas/cat.schema';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { CatsListner } from 'src/listeners/cats.listener';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'test',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CacheModule.register({ ttl: 10, max: 10000 }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [
    CatsListner,
    CatsService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class CatsModule {}
