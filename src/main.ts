import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 解析 application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  // 启用跨源资源共享（CORS）
  app.enableCors();
  // 引入 Swagger
  const config = new DocumentBuilder()
    .setTitle('Nest Template')
    .setDescription('这是 Nest Template API 文档')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  app.useGlobalPipes(new ValidationPipe());
  // 引入 Nest ConfigService
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  // 动态获取 HTTP 服务端口
  const http_port = configService.get('SERVER_PORT');
  await app.listen(http_port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  HTTP 服务正在运行：http://localhost:${http_port}
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `);
}

bootstrap();
