import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/Admin.entity';
import { ApartmentEntity } from './entities/Apartment.entity';
import { ChamberEntity } from './entities/Chamber.entity';
import { CommentEntity } from './entities/Comment.entity';
import { FavoriteEntity } from './entities/Favorite.entity';
import { HouseEntity } from './entities/House.entity';
import { LandlordEntity } from './entities/Landlord.entity';
import { PaymentEntity } from './entities/Payment.entity';
import { PictureEntity } from './entities/Picture.entity';
import { PropertyEntity } from './entities/Property.entity';
import { StudioEntity } from './entities/Studio.entity';
import { UserEntity } from './entities/User.entity';
import { PropertyModule } from './modules/property/property.module';

@Module({
  imports: [
    PropertyModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'OpiolDatabase',
      entities: [AdminEntity, ApartmentEntity, ChamberEntity, CommentEntity, FavoriteEntity, HouseEntity, LandlordEntity, PaymentEntity, PictureEntity, PropertyEntity, StudioEntity, UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
