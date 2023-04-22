import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LandlordEntity } from "./Landlord.entity";
import { PropertyEntity } from "./Property.entity";

@Entity('Admin')
export class AdminEntity extends LandlordEntity {
    @PrimaryGeneratedColumn({
        name: 'admin_id'
    })
    id: number;

    @OneToMany(type => PropertyEntity, property => property.owner)
    properties: PropertyEntity[];
}