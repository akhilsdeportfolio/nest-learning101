import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  async use(req: Request, res: Response, next) {
    //Logger.log(req.method + req.url, 'info');
    //Logger.log(req.headers, 'info');
    //Logger.log(req.body, 'info');
    next();
  }
}
