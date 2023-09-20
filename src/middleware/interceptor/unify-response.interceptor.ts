import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getReqMainInfo } from '../../utils/getReqMainInfo';

/**
 * 全局响应拦截器
 */
@Injectable()
export class UnifyResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    return next.handle().pipe(
      map(data => {
        this.logger.info(`ENTER GLOBAL RESPONSE INTERCEPTOR`, {
          responseData: data,
          req: getReqMainInfo(req),
        });
        return {
          code: 0,
          data,
          msg: 'SUCCESS',
        };
      }),
    );
  }
}
