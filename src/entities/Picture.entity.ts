import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./Property.entity";

@Entity('Picture')
export class PictureEntity {
    @PrimaryGeneratedColumn({
        name: 'pricture_id',
    })
    id: number;

    @Column()
    fieldname: string;

    @Column()
    originalname: string;

    @Column()
    encoding: string;
    
    @Column()
    mimetype: string;

    @Column()
    destination: string;
    
    @Column()
    filename: string;
    
    @Column()
    path: string;
    
    @Column()
    size: number;

    @ManyToOne(type => PropertyEntity, property => property.pictures)
    property: PropertyEntity;
}