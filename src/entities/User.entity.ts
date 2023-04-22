import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        type: 'boolean',
    })
    sex: boolean;

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

    @Column()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    phone: string;
    
    @CreateDateColumn()
    created: Date;
}