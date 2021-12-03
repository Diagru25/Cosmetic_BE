import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import apiResponse from 'src/helpers/api_response';
import { UsersService } from '../database/services/tbl_user.service';

@Controller('/admin/v1/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    async getAll(@Param() params: any, @Res() res: Response) {
        return apiResponse(res, 200, {});
    }

    @Post()
    async insert(@Body() data: any, @Res() res: Response) {
        const result = await this.usersService.insert(data);
        return apiResponse(res, 200, result);
    }

}
