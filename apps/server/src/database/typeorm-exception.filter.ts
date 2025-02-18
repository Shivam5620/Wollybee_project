import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status =
      exception instanceof HttpException
        ? (exception.getStatus() as HttpStatus)
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message;

    // Handle specific error codes
    if (
      exception.message.includes(
        'duplicate key value violates unique constraint',
      )
    ) {
      message = 'Duplicate value error';
      status = HttpStatus.CONFLICT;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: 'Database Error',
    });
  }
}
