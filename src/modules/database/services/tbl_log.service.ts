import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose";
import { BaseService } from "src/shared/base.service";
import { tbl_log, LogDocument } from "../schema";

@Injectable()
export class LogService extends BaseService<LogDocument, any> {
    constructor (
        @InjectModel(tbl_log.name)
        private readonly _model: Model<LogDocument>
    ) {
        super(_model)
    }
}