import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordEntity } from 'src/entities/Landlord.entity';
import { LandlordDto } from 'src/dtos/Landlord.dto';


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

  @Post()
  async createuser(lanldlor: LandlordDto) {
    const landlord = await this.landlordService.createUser(lanldlor);

    if (landlord)
      return landlord;
    
    throw new HttpException("C'ant create the lanldord, it seem like there is an error with the connection to database", HttpStatus.NOT_MODIFIED)
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
 
 

