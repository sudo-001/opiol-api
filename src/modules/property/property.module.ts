import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/entities/Property.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PictureEntity } from 'src/entities/Picture.entity';

@Module({
  imports: [
    MulterModule.register({ dest: "./uploads"}),
    TypeOrmModule.forFeature([PropertyEntity, PictureEntity])],
  controllers: [PropertyController],
  providers: [PropertyService]
})
export class PropertyModule {}
