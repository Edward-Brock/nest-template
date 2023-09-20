import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

const winstonConfig: WinstonModuleOptions = {
  // Winston 配置选项
  transports: [
    // 打印到控制台，生产可注释关闭该功能
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(info => {
          return `${info.timestamp} [${info.level}] ${info.message}`;
        }),
      ),
    }),
    // 保存到文件
    new winston.transports.DailyRotateFile({
      dirname: `logs/combined`, // 日志保存的目录
      filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值
      datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天
      zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件
      maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb
      maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件
      // 记录时添加时间戳信息
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      dirname: `logs/error`, // 日志保存的目录
      filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值
      datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天
      zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件
      maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb
      maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件
      // 记录时添加时间戳信息
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.colorize(),
        winston.format.json(),
      ),
    }),
  ],
};

export default winstonConfig;
