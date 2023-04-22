import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./Property.entity";

@Entity('Picture')
export class PictureEntity {
    @PrimaryGeneratedColumn({
        name: 'pricture_id',
    })
    id: number;

    @Column()
    filename: string;

    @ManyToOne(type => PropertyEntity, property => property.pictures)
    property: PropertyEntity;
}