import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 引入 Nest ConfigService
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  // 动态获取 HTTP 服务端口
  const http_port = configService.get('SERVER_PORT');
  await app.listen(http_port);
  console.log(`
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  HTTP 服务正在运行：http://localhost:${http_port}
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `);
}

bootstrap();
