import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity('Payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn({
        name: 'payment_id',
    })
    id: number;

    @Column()
    date_of_visit_occupation: Date;
    
    @Column()
    momo_om: string;
    
    @Column({ nullable: true })
    occupancy_duration: string;
    
    @Column()
    amount: number;

    @Column({
        type: 'text',
    })
    reason: string;
    
    @ManyToOne(type => UserEntity, user => user.payments)
    sender: UserEntity;
}
