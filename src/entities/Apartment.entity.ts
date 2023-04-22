import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./Property.entity";

@Entity('Apartment')
export class ApartmentEntity extends PropertyEntity {
    @PrimaryGeneratedColumn({
        name: 'apartment_id',
    })
    id: number;

}