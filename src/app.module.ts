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
import { MulterModule } from '@nestjs/platform-express';
import { CommentsModule } from './modules/comments/comments.module';
import { UserModule } from './modules/user/user.module';
import { LandlordModule } from './modules/landlord/landlord.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { PaymentModule } from './modules/payment/payment.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: {
        expiresIn: '604800s' // 7 jours
      }
    }),
    MulterModule.register({ dest: './uploads'}),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      type: 'sqlite',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      database: 'OpiolDatabase',
      entities: [AdminEntity, ApartmentEntity, ChamberEntity, CommentEntity, FavoriteEntity, HouseEntity, LandlordEntity, PaymentEntity, PictureEntity, PropertyEntity, StudioEntity, UserEntity],
      synchronize: true,
    }),
    PropertyModule,
    CommentsModule,
    UserModule,
    LandlordModule,
    AuthModule,
    PaymentModule,
    
   
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
