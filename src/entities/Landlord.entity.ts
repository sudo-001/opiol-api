import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { PropertyEntity } from "./Property.entity";

@Entity('Landlord')
export class LandlordEntity extends UserEntity {
    @PrimaryGeneratedColumn({
        name: 'landlord_id',
    })
    id: number;

    @OneToMany(type => PropertyEntity, property => property.owner)
    properties: PropertyEntity[];
}