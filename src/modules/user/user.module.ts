import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { PictureEntity } from 'src/entities/Picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PictureEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
