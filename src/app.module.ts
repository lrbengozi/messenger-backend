import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lrmongo:lpassrword@cluster0.hl84w.mongodb.net/test',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
