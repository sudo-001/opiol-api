import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyEntity } from 'src/entities/Property.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('property')
export class PropertyController {
    
    constructor(
        private readonly propertyService: PropertyService
    ) {}


    @Get()
    getAll() {
        return this.propertyService.findAll();
    }

    @Get(':property_id')
    async findOne(@Param('property_id') propertyId: string) {
        const property = await this.propertyService.findOne(parseInt(propertyId));

        if (property)
            return property;
        throw new HttpException("Entity not found", HttpStatus.NOT_FOUND);
    }


    @UseInterceptors(FileInterceptor('file'))
    @Post('file')
    uploadFile(
        @UploadedFile() file: Express.Multer.File) {
        console.log(file);

        return "File uploaded";
    }

    @Delete(':property_id')
    async remove(@Param('property_id') propertyId: string) {
        const property = await this.propertyService.setToDeleted(parseInt(propertyId));

        if (property)
            return property;
        throw new HttpException("Property not found", HttpStatus.NOT_FOUND);
    }

}
