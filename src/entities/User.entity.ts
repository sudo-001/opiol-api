import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FavoriteEntity } from "./Favorite.entity";
import { PaymentEntity } from "./Payment.entity";
import { PropertyEntity } from "./Property.entity";
import { PictureEntity } from "./Picture.entity";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'user_id'})
    id: number;

    @Column()
    lastName: string;

    @Column({ 
        nullable: true
    })
    firstName: string;

    @Column()
    sex: string;

    @Column({ type: Date })
    birthDate: Date;

    @Column()
    profession: string;

    @Column({
        type: 'int'
    })
    sizeFamily: number;

    @Column()
    userName: string;

    @Column({
        default: "user",
    })
    type: string;

    @Column()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    phone: string;
    
    @CreateDateColumn()
    created: Date;

    @ManyToMany(type => FavoriteEntity)
    @JoinTable()
    favorites: FavoriteEntity[];

    @OneToMany(type => PaymentEntity, payment => payment.sender)
    payments: PaymentEntity[];

    @OneToMany(type => PropertyEntity, property => property.occupant)
    OccupiedProperties: PropertyEntity[];

    @OneToOne(() => PictureEntity)
    picture: PictureEntity;
}