import { ApiProperty } from "@nestjs/swagger";

export class ChamberDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    location: string;

    @ApiProperty()
    furnished: boolean;

    @ApiProperty()
    description: string;

    @ApiProperty()
    numberOfRooms: number;

    @ApiProperty()
    rate: number;
}