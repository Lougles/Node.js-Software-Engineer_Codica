import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const temp = host.switchToHttp();
    const response = temp.getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.message,
      });
    } else {
      console.error(exception);

      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
