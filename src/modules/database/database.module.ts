import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';

import keys from 'src/configs/keys';
import {
  GroupSchema,
  ModuleSchema,
  PermissionSchema,
  UserSchema,
  RoleSchema,
  LogSchema,
  LockIpSchema,
  tbl_group,
  tbl_module,
  tbl_permission,
  tbl_user,
  tbl_role,
  tbl_log,
  tbl_lockip,
} from './schema';
import { GroupsService } from './services/tbl_group.service';
import { UsersService } from './services/tbl_user.service';
import { AuthService } from './services/auth.service';
import { LogService } from './services/tbl_log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: tbl_group.name,
        schema: GroupSchema,
      },
      {
        name: tbl_module.name,
        schema: ModuleSchema,
      },
      {
        name: tbl_permission.name,
        schema: PermissionSchema,
      },
      {
        name: tbl_user.name,
        schema: UserSchema,
      },
      {
        name: tbl_role.name,
        schema: RoleSchema,
      },
      {
        name: tbl_log.name,
        schema: LogSchema,
      },
      {
        name: tbl_lockip.name,
        schema: LockIpSchema,
      },
    ]),
    JwtModule.register({
      secret: keys.jwt.JWT_SECRET,
      signOptions: {
        expiresIn: keys.jwt.expiresIn,
      },
    }),
  ],

  providers: [GroupsService, UsersService, AuthService, LogService],
  exports: [GroupsService, UsersService, AuthService, LogService],
})
export class DatabaseModule {}
