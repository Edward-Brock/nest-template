import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getReqMainInfo } from '../../utils/getReqMainInfo';
import * as dayjs from 'dayjs';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * 全局异常捕获过滤器
 */
@Catch()
export default class UnifyExceptionFilter implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp(); // 获取当前执行上下文
    const res = ctx.getResponse<Response>(); // 获取响应对象
    const req = ctx.getRequest<Request>(); // 获取请求对象
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception['message'] ||
      exception['message']['message'] ||
      exception['message']['error'] ||
      null;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      data: message,
    };

    // 记录日志（错误消息，错误码，请求信息等）
    this.logger.error(`⚠️ 全局异常过滤器已捕获到异常 ⚠️`);
    this.logger.error(message, {
      httpStatus,
      req: getReqMainInfo(req),
      stack: exception['stack'],
    });

    res
      .status(httpStatus >= 500 ? httpStatus : 200)
      .json({ code: 1, responseBody, msg: 'ERROR' });
  }
}
