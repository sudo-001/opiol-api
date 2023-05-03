import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordController } from './landlord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandlordEntity } from 'src/entities/User.entity';
@Module({
  controllers: [LandlordController],
  providers: [LandlordService]
})
export class LandlordModule {}
