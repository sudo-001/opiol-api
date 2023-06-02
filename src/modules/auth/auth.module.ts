import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { LandlordEntity } from 'src/entities/Landlord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, LandlordEntity])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
