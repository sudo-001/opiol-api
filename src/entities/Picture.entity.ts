import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Picture')
export class PictureEntity {
    @PrimaryGeneratedColumn({
        name: 'pricture_id',
    })
    id: number;

    @Column()
    filename: string;

}