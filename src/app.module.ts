import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import keys from './configs/keys';
import { DatabaseModule } from './modules/database/database.module';
import { GroupsModule } from './modules/groups/groups.module';
@Module({
  imports: [
    MongooseModule.forRoot(keys.mongoURI),
    DatabaseModule,
    GroupsModule
  ],
})
export class AppModule {}
