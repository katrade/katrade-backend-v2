import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 8080);
  console.log("Cold Smooth And Nikky");
}
bootstrap();
