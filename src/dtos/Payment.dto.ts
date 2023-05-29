import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {

    @ApiProperty()
    amount: number;

    @ApiProperty()
    reason: string;
    
}