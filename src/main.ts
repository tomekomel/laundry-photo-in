import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';
import * as hbsHelpers from 'handlebars-helpers';
const multihelpers = hbsHelpers();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  app.engine(
    '.hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
      helpers: { ...multihelpers },
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.set('views', join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(process.env.PORT || config.get('APP_PORT'));
}
bootstrap();
