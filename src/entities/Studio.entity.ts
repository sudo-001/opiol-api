import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./Property.entity";

@Entity('Studio')
export class StudioEntity extends PropertyEntity {
    @PrimaryGeneratedColumn({
        name: 'studio_id',
    })
    id: number;

}