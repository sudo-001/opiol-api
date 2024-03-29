import { ApiProperty } from "@nestjs/swagger";

export class PropertyDto {
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
    category: string;

    @ApiProperty()
    ville: string;

    @ApiProperty()
    quartier: string;

    @ApiProperty()
    pays: string;

    @ApiProperty()
    type: string;
    
    @ApiProperty()
    numberOfRooms: number;

    @ApiProperty()
    rate: number;

}