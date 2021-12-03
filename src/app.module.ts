import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import keys from './configs/keys';
import { DatabaseModule } from './modules/database/database.module';
import { GroupsModule } from './modules/groups/groups.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    MongooseModule.forRoot(keys.mongoURI),
    DatabaseModule,
    GroupsModule,
    UsersModule
  ],
})
export class AppModule {}
