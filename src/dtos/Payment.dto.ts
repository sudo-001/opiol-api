import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {

    @ApiProperty()
    date_of_visit_occupation: Date;
    
    @ApiProperty()
    momo_om: string;
    
    @ApiProperty()
    occupancy_duration: string;
    
    @ApiProperty()
    amount: number;

    @ApiProperty()
    reason: string;
    
}
