import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { SkipAuth } from 'src/decorators/SkipAuth.decorator';
import { PaymentDto } from 'src/dtos/Payment.dto';

@Controller('payment')
export class PaymentController {

    constructor(
        private readonly paymentService: PaymentService
    ) {}

    // Fonction qui retourne tout les paiement enregistrés dans la base de données
    @SkipAuth()
    @Get()
    getAll() {
        return this.paymentService.findAll();
    }

    // Fonction de création d'un paiement
    @SkipAuth()
    @Post("/:user_id")
    create(@Param("user_id") userId: number,@Body() payment: PaymentDto) {
        return this.paymentService.createPayment(userId,payment);
    }

    // Fonction de récupération d'un paiment particulier
    @Get("/:payment_id")
    async getPayment(@Param("payment_id") paymentId: number) {
        const payment = await this.paymentService.findOne(paymentId);

        if (payment)
            return payment;
        
        throw new HttpException("Entity not found", HttpStatus.NOT_FOUND);
    }

    // Fonction de suppréssion d'un paiement particulier
    @Delete("/:payment_id")
    async deletePayment(@Param("payment_id") paymentId: number) {
        const deletedPayment = await this.paymentService.deleteOne(paymentId);
    }
}
