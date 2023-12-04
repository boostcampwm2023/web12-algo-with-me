import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

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
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  setSwagger(app);
  await app.listen(3000);
}
bootstrap();
