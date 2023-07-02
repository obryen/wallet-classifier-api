import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DEFAULT_ERROR_MESSAGES } from '.';

@Catch()
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      if (status === HttpStatus.BAD_REQUEST) {
        return response.status(status).json({
          message: exception.message,
          error: exception?.['options']?.description
            ? JSON.parse(exception['options'].description)
            : undefined,
        });
      }

      return response.status(status).json({
        message: exception.message,
      });
    } else {
      console.log(exception);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: DEFAULT_ERROR_MESSAGES[HttpStatus.INTERNAL_SERVER_ERROR],
      });
    }
  }
}
