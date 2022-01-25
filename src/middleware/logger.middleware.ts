import {
  tbl_log,
  LogDocument,
} from './../modules/database/schema/tbl_log.schema';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { LogService } from 'src/modules/database/services/tbl_log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //kieu 1
  //   constructor(
  //     @InjectModel(tbl_log.name)
  //     private readonly logModel: Model<LogDocument>,
  //   ) {}

  //kieu 2
  //   @InjectModel(tbl_log.name)
  //   private readonly logModel: Model<LogDocument>;

  //kieu 3
  @Inject(LogService)
  logServices: LogService;

  use(req: Request, res: Response, next: NextFunction) {
    console.log('middleware: ', req.ip);

    //const count = await this.logModel.find().exec();
    next();
  }
}
