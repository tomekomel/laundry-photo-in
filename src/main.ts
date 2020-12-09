import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.set('views', join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(config.get('APP_PORT'));
}
bootstrap();
