import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/entities/User.entity";
import { PropertyEntity } from "src/entities/Property.entity";

export class FavoriteDto {

    @ApiProperty()
    user: UserEntity[];

    @ApiProperty()
    property: PropertyEntity[];


}