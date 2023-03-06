import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './utils/exceptions';
import * as express from 'express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nodejs-Software-Engineer_Codica')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('codica')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/api', express.static(path.join(__dirname, 'public/swagger-ui')));
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  app.use(bodyParser.json({ limit: '2mb' }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
}
bootstrap();
