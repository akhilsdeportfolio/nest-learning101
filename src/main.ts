import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as csurf from 'csurf';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  // /app.use(csurf());
  app.enableCors();
  // arapp.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7007);
}
bootstrap();
