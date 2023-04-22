import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { LandlordEntity } from "./Landlord.entity";

@Entity('Admin')
export class AdminEntity extends LandlordEntity {
    @PrimaryGeneratedColumn({
        name: 'admin_id'
    })
    id: number;
}