import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(error => throwError(new BadGatewayException()));
  }
}
