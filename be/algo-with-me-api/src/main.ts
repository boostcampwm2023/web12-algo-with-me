import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ServiceExceptionFilter } from './exception/service.exception.filter';

import { AppModule } from '@src/app.module';

function setSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('algo-with-me-api')
    .setDescription('algo with me API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalFilters(new ServiceExceptionFilter());
  setSwagger(app);
  await app.listen(3000);
}
bootstrap();
