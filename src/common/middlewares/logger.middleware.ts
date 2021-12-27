import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

interface BodyWithPasswords {
  password: string;
  password2: string;
}

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  private passwordReplacer = '?????';

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} ${JSON.stringify(
          this.filterOutPasswordProperties(body),
        )} - ${userAgent} ${ip}`,
      );
    });

    next();
  }

  private filterOutPasswordProperties(
    body: BodyWithPasswords,
  ): BodyWithPasswords {
    body.password = this.passwordReplacer;
    body.password2 = this.passwordReplacer;

    return body;
  }
}
