import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { PropertyEntity } from "./Property.entity";

@Entity('Favorite')
export class FavoriteEntity {
    @PrimaryGeneratedColumn({
        name: 'favorite_id',
    })
    id: number;


    @ManyToMany(type => UserEntity)
    users: UserEntity[];

    @ManyToMany(type => PropertyEntity)
    properties: PropertyEntity[];
}