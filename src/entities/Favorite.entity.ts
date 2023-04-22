import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Favorite')
export class FavoriteEntity {
    @PrimaryGeneratedColumn({
        name: 'favorite_id',
    })
    id: number;

    
}