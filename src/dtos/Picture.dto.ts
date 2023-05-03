import { ApiProperty } from "@nestjs/swagger";

export class PictureDto {

    @ApiProperty()
<<<<<<< HEAD
    name: string;

} 
=======
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
>>>>>>> 683135ca53754e28f698f8f63b8c65ff23f12b21
