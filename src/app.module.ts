import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import UnifyExceptionFilter from './middleware/filter/uinify-exception.filter';
import { UnifyResponseInterceptor } from './middleware/interceptor/unify-response.interceptor';
import logger from './middleware/logger/logger.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './module/health/health.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthGuard } from './module/auth/guard/jwt-auth.guard';
import { RolesGuard } from './module/role/guard/roles.guard';
import winstonConfig from './config/winston.config';
import typeormConfig from './config/typeorm.config';
import throttlerConfig from './config/throttler.config';

@Module({
  imports: [
    // Nest Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    // Winston 配置
    WinstonModule.forRoot(winstonConfig),
    // Rate limiting 速率限制配置
    ThrottlerModule.forRootAsync(throttlerConfig),
    // TypeORM 配置
    TypeOrmModule.forRootAsync(typeormConfig),
    HealthModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 应用全局过滤器
    {
      provide: APP_FILTER,
      useClass: UnifyExceptionFilter,
    },
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: UnifyResponseInterceptor,
    },
    // 启用全局身份验证（Authentication）
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 启用全局授权认证（Authorization）
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // 应用全局中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
