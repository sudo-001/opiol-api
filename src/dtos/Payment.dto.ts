import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {

    @ApiProperty()
    mount: number;

    @ApiProperty()
    reason: string;
    
}