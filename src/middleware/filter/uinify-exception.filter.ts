import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getReqMainInfo } from '../../utils/getReqMainInfo';
import * as dayjs from 'dayjs';

/**
 * 全局异常捕获过滤器
 */
@Catch()
export default class UnifyExceptionFilter implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('※ Enter global exception filter');
    const ctx = host.switchToHttp(); // 获取当前执行上下文
    const res = ctx.getResponse<Response>(); // 获取响应对象
    const req = ctx.getRequest<Request>(); // 获取请求对象
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception.message ||
      exception.message['message'] ||
      exception.message['error'] ||
      null;

    const data = {
      statusCode: status,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: req.url,
      data: message,
    };

    // 记录日志（错误消息，错误码，请求信息等）
    this.logger.error(message, {
      status,
      req: getReqMainInfo(req),
      stack: exception.stack,
    });

    res
      .status(status >= 500 ? status : 200)
      .json({ code: 1, data, msg: 'ERROR' });
  }
}
