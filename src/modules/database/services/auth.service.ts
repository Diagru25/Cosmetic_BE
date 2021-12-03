import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { tbl_user, UserDocument } from '../schema/tbl_user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(tbl_user.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel
      .findOne({
        $or: [
          { username: username },
          { email: username },
          { phone_number: username },
        ],
      })
      .exec();

    if (!user)
      return {
        isValidate: false,
      };

    if (user && (await bcrypt.compare(password, user.password)))
      return {
        isValidate: true,
        user,
      };

    return {
      isValidate: false,
    };
  }
}
