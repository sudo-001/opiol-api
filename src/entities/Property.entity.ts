import { Max, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./Comment.entity";
import { PictureEntity } from "./Picture.entity";
import { AdminEntity } from "./Admin.entity";
import { UserEntity } from "./User.entity";
import { LandlordEntity } from "./Landlord.entity";

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

    @OneToMany(type => CommentEntity, comment => comment.property)
    comments: CommentEntity[];

    @OneToMany(type => PictureEntity, picture => picture.property)
    pictures: PictureEntity[];

    @ManyToOne(type => LandlordEntity, landlord => landlord.properties)
    owner: LandlordEntity;

    @ManyToOne(type => UserEntity, user => user.OccupiedProperties)
    occupant: UserEntity;

}