import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const typeormConfig: TypeOrmModule = {
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
};

export default typeormConfig;
