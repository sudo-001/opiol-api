import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDto } from 'src/dtos/Payment.dto';
import { PaymentEntity } from 'src/entities/Payment.entity';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    findAll() {
        const payments = this.paymentRepository.find();
        return payments;
    }

    async findOne(paymentId: number) {
        const payment = await this.paymentRepository.findOne({
            where: { id: paymentId }
        });

        if (!payment)
            return null;
        
        return payment;
    }

    async createPayment(userId: number, payment: PaymentDto) {

        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user)
            return null;
        
        let paymentToSave = new PaymentEntity();

        paymentToSave.amount = payment.amount;
        paymentToSave.reason = payment.reason;
        paymentToSave.date_of_visit_occupation = payment.date_of_visit_occupation;
        paymentToSave.momo_om = payment.momo_om;
        paymentToSave.occupancy_duration = payment.occupancy_duration;
        paymentToSave.sender = user;

        return this.paymentRepository.save(paymentToSave);
        
    }

    async deleteOne(paymentId: number) {
        const payment = await this.paymentRepository.findOne({
            where: { id: paymentId }
        });

        if (!payment)
            return null;
        
        this.paymentRepository.remove(payment);
        return payment;
    }
}
