import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity('Landlord')
export class LandlordEntity extends UserEntity {
    @PrimaryGeneratedColumn({
        name: 'landlord_id',
    })
    id: number;
}