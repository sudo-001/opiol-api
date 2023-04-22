import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./Property.entity";

@Entity('Chamber')
export class ChamberEntity extends PropertyEntity {
    @PrimaryGeneratedColumn({
        name: 'chamber_id',
    })
    id: number;

}