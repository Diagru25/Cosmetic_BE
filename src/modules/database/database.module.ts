import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';

import keys from 'src/configs/keys';
import {
  GroupSchema,
  ModuleSchema,
  PermissionSchema,
  tbl_group,
  tbl_module,
  tbl_permission,
} from './schema';
import { GroupsService } from './services/tbl_group.service';

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
      ,
      {
        name: tbl_permission.name,
        schema: PermissionSchema,
      },
    ]),
    JwtModule.register({
      secret: keys.jwt.JWT_SECRET,
      signOptions: {
        expiresIn: keys.jwt.expiresIn,
      },
    }),
  ],

  providers: [
      GroupsService
  ],
  exports: [
      GroupsService
  ],
})
export class DatabaseModule {}
