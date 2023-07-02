import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, Send } from 'express';
import { omit } from 'lodash';
import CONFIG from 'src/config';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(RequestLoggerMiddleware.name);
  private isProd = CONFIG.ENV.IS_PRODUCTION;

  private captureResBody(res: Response, send: Send) {
    return (body?: any) => {
      res.locals.body = body;
      res.send = send;
      return res.send(body);
    };
  }

  private cleanHeaders(obj: Record<string, any>) {
    return omit(obj, ['Authorization', 'authorization']);
  }

  private genReqObj(req: Request) {
    return {
      method: req.method,
      path: req.path,
      headers: this.cleanHeaders(req.headers),
      query: req.query,
      body: !this.isProd ? req.body : undefined,
    };
  }

  private parseResBody(body) {
    try {
      return JSON.parse(body);
    } catch (_) {
      return body;
    }
  }

  private genResObj(res: Response) {
    return {
      statusCode: res.statusCode,
      headers: this.cleanHeaders(res.getHeaders()),
      body: !this.isProd ? this.parseResBody(res.locals.body) : undefined,
    };
  }

  use(req: Request, res: Response, next: () => void) {
    // We can also generate and add a request id to the request here

    res.send = this.captureResBody(res, res.send);
    const startTs = Date.now();

    res.on('finish', () => {
      this.logger.log(
        'API LOG',
        JSON.stringify(
          {
            req: this.genReqObj(req),
            res: this.genResObj(res),
            requestDurationMs: Date.now() - startTs,
          },
          null,
          2
        )
      );
    });

    next();
  }
}
