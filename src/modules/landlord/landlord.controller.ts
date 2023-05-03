import { Controller, Delete, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordEntity } from 'src/entities/Landlord.entity';


@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  /*@Post()
  create(@Body() createLandlordDto: CreateLandlordDto) {
    return this.landlordService.create(createLandlordDto);
  }*/

  @Get()
  findAll() {
    return this.landlordService.findAll();
  }

  @Get(':landlord_id')
  async findOne(@Param('landlord_id') landlordId: string) {
    const landlord = await this.landlordService.findOne(parseInt(landlordId));
    if (landlord)
        return landlord;
    throw new HttpException("Entity not found", HttpStatus.NOT_FOUND);

  
  }
 
 
 

 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandlordDto: UpdateLandlordDto) {
    return this.landlordService.update(+id, updateLandlordDto);
  }*/

  @Delete(':landlord_id')
  async remove(@Param('landlord_id') landlordId: string) {
      const landlord = await this.landlordService.setToDeleted(parseInt(landlordId));
      if (landlord)
          return landlord;
      throw new HttpException("landlord not found", HttpStatus.NOT_FOUND);
  }
}
 
 

