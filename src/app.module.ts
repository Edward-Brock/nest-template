import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT'),
        },
      ],
    }),
    // TypeORM 配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为 localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', 'password'), // 密码
        database: configService.get('DB_DATABASE', 'database'), // 数据库名
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: true, // 根据实体自动创建数据库表，生产环境建议关闭
        // entities: ['dist/**/*.entity{.ts, .d.ts, .js}'], // 数据表实体
        autoLoadEntities: true, // 如果为 true，将自动加载实体 TypeOrmModule.forFeature() 方法注册的每个实体都将自动添加到配置对象的实体
      }),
    }),
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
