import { ApiProperty } from "@nestjs/swagger";

export class PictureDto {

    @ApiProperty()
    fieldname: string;

    @ApiProperty()
    originalname: string;

    @ApiProperty()
    encoding: string;
    
    @ApiProperty()
    mimetype: string;

    @ApiProperty()
    destination: string;
    
    @ApiProperty()
    filename: string;
    
    @ApiProperty()
    path: string;
    
    @ApiProperty()
    size: number;
}