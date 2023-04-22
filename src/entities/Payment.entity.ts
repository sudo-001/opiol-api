import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn({
        name: 'payment_id',
    })
    id: number;

    @Column()
    amount: number;

    @Column({
        type: 'text',
    })
    reason: string;
}