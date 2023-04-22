import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

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
    
    @ManyToOne(type => UserEntity, user => user.payments)
    sender: UserEntity;
}