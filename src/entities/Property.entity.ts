import { Max, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Property')
export class PropertyEntity {
    @PrimaryGeneratedColumn({
        name: 'property_id',
    })
    id: number;

    @Column({
        nullable: true,
    })
    name: string;

    @Column({
        type: 'int',
        default: 0,
    })
    price: number;

    @Column()
    location: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    furnished: boolean;

    @Column({
        type: 'text',
    })
    description: string;

    @Column({
        type: 'int',
    })
    numberOfRooms: number;

    @Column()
    @Min(0)
    @Max(5)
    rate: number;

    @CreateDateColumn()
    created: Date;

}