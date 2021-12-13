import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { tbl_user, UserDocument } from '../schema/tbl_user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(tbl_user.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
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

  async login(user: any): Promise<any> {
    try {
      const payload = {
        sub: user._id,
      };

      return {
        isSuccess: true,
        status: HttpStatus.OK,
        data: {
            access_token: this.jwtService.sign(payload),
        }
      };
    } catch (error) {
      return {
        isSuccess: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
