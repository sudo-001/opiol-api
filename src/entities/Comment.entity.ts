import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Comments')
export class CommentEntity {
    @PrimaryGeneratedColumn({
        name: 'comment_id'
    })
    id: number;

    @Column({
        type: 'text', 
    })
    text: string;


    @Column({
        type: 'boolean',
    })
    visible: boolean;


    @CreateDateColumn()
    created: Date;
}