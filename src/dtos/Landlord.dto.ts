import { ApiProperty } from "@nestjs/swagger";
import { FavoriteEntity } from "src/entities/Favorite.entity";
import { PropertyEntity } from "src/entities/Property.entity";

export class LandlordDto {
    
    @ApiProperty()
    idCard: string;
    
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    sex: string;

    @ApiProperty()
    birthDate: Date;

    @ApiProperty()
    profession: string;

    @ApiProperty()
    sizeFamily: number;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;
    
    @ApiProperty()
    favorites: FavoriteEntity[];

    @ApiProperty()
    property: PropertyEntity[];

}