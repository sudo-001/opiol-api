import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./Property.entity";

@Entity('House')
export class HouseEntity extends PropertyEntity {
    @PrimaryGeneratedColumn({
        name: 'house_id',
    })
    id: number;

}