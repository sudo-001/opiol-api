import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordController } from './landlord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandlordEntity } from 'src/entities/Landlord.entity';
import { PictureEntity } from 'src/entities/Picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LandlordEntity, PictureEntity])],
  controllers: [LandlordController],
  providers: [LandlordService]
})
export class LandlordModule {}
