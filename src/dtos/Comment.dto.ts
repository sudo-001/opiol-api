<<<<<<< HEAD
import { ApiProperty} from "@nestjs/swagger";

export class CommentDto {

    @ApiProperty()
    text: string;

    @ApiProperty()
    visible: boolean;


=======
import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
    @ApiProperty()
    text: string;    
>>>>>>> 683135ca53754e28f698f8f63b8c65ff23f12b21
}