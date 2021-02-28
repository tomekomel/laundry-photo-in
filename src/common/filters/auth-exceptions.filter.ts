import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    if (exception instanceof UnauthorizedException) {
      request.flash('info', 'Please try again!');
      response.redirect('/auth/login');
    } else if (exception instanceof ForbiddenException) {
      request.flash(
        'info',
        'You are not authorized to edit this resource!',
      );
      response.redirect('/auth/login');
    } else {
      response.redirect('/error');
    }
  }
}
