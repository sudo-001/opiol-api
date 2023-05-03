import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyEntity } from "./Property.entity";

@Entity('Comments')
export class CommentEntity {
    @PrimaryGeneratedColumn({
        name: 'comment_id'
    })
    id: number;

    @Column({
        type: 'text', 
    })
    owner: string;

    @Column({
        type: 'text', 
    })
    text: string;


    @Column({
        type: 'boolean',
        default: true,
    })
    visible: boolean;


    @CreateDateColumn()
    created: Date;

    @ManyToOne(type => PropertyEntity, property => property.comments)
    property: PropertyEntity;
}