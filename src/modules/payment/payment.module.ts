import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/entities/Payment.entity';
import { UserEntity } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, UserEntity])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
