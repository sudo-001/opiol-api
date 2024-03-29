import { Body, Controller, Delete, FileTypeValidator, Get, HttpException, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseFilePipeBuilder, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyEntity } from 'src/entities/Property.entity';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PropertyDto } from 'src/dtos/Property.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators/SkipAuth.decorator';

@Controller('property')
export class PropertyController {

    constructor(
        private readonly propertyService: PropertyService
    ) { }


    // Controller to get all the properties
    @SkipAuth()
    @Get()
    getAll() {
        return this.propertyService.findAll();
    }

    // Controller to get one specific property
    @SkipAuth()
    @Get(':property_id')
    async findOne(@Param('property_id') propertyId: string) {
        const property = await this.propertyService.findOne(parseInt(propertyId));

        if (property)
            return property;
        throw new HttpException("Entity not found", HttpStatus.NOT_FOUND);
    }

    // Controller to get properties by country
    @SkipAuth()
    @Get('/find/country/:country')
    findByCountry(@Param('country') country: string) {
        return this.propertyService.findByCountry(country)
    }

    // Controller to get properties by city
    @SkipAuth()
    @Get('/find/city/:city')
    findByCity(@Param('city') city: string) {
        return this.propertyService.findByCity(city);
    }

    // Controller to get properties by city
    @SkipAuth()
    @Get('/find/quartier/:city')
    findByQuartier(@Param('city') quartier: string) {
        return this.propertyService.findByQuartier(quartier);
    }

    // Controller to add an array of image uploaded corresponding to a property
    @SkipAuth()
    @Post('/pictures/:article_id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                filename: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            }
        }
    })
    @UseInterceptors(FilesInterceptor('filename', 4, {
        storage: diskStorage({
            destination: './uploads/properties',
            filename(req, file, callback) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        })
    }))
    async uploadPictures(
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'jpeg',
                })
                .addMaxSizeValidator({
                    maxSize: 780000
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                }),
        )
        pictures: Array<Express.Multer.File>,
        @Param('article_id') articleId: string
    ) {
        console.log(pictures)
        
        pictures.forEach((picture) => {
            picture.path = __dirname + picture.path;
        })

        const property = await this.propertyService.addPicturesToProperty(parseInt(articleId), pictures);

        if (property)
            return property;

        throw new HttpException("Can't add pictures to the property", HttpStatus.NOT_MODIFIED)
    }


    // // Controller to add property information with images to the database in just one request from the front
    // @Post()
    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             filename: {
    //                 type: 'array',
    //                 items: {
    //                     type: 'string',
    //                     format: 'binary'
    //                 }
    //             }
    //         }
    //     }
    // })
    // @UseInterceptors(FilesInterceptor('filename', 4, {
    //     storage: diskStorage({
    //         destination: './uploads/properties',
    //         filename(req, file, callback) {
    //             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //             const ext = extname(file.originalname);
    //             const filename = `${uniqueSuffix}${ext}`;
    //             callback(null, filename);
    //         },
    //     })
    // }))
    // async creteProperty(@Body() property: PropertyDto,
    // @UploadedFiles(
    //     new ParseFilePipeBuilder()
    //         .addFileTypeValidator({
    //             fileType: 'jpeg',
    //         })
    //         .addMaxSizeValidator({
    //             maxSize: 780000
    //         })
    //         .build({
    //             errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    //         }),
    // ) pictures?: Array<Express.Multer.File>) {
    //     const propertyAdded = await this.propertyService.createProperty(property);
        
    //     // if (propertyAdded)
    //     //     return propertyAdded;
    //     if (!propertyAdded)
    //         throw new HttpException("Can't create an article", HttpStatus.NOT_MODIFIED)
        
    //     const response = await this.propertyService.addPicturesToProperty(parseInt(propertyAdded.id), pictures);

    //     if (response)
    //         return response;

    //     throw new HttpException("Can't add pictures to this property, or c'ant find the property", HttpStatus.NOT_FOUND)

    // }



    // Controller to add property information without images to the database
    @SkipAuth()
    @Post(":owner_id")
    async creteProperty(@Body() property: PropertyDto, @Param("owner_id") landlordId: number) {
        const propertyAdded = await this.propertyService.createProperty(property,landlordId);

        if (propertyAdded)
            return propertyAdded;

        throw new HttpException("Can't create an article", HttpStatus.NOT_MODIFIED)
    }

    // Controller to delete a property
    @Delete('/delete/:property_id')
    async remove(@Param('property_id') propertyId: string) {
        const property = await this.propertyService.setToDeleted(parseInt(propertyId));

        if (property)
            return property;
        throw new HttpException("Property not found", HttpStatus.NOT_FOUND);
    }

    // Controller to change the visibility of a property
    @Put('/visibility/:property_id')
    async changeVisibility(@Param("property_id") propertyId: number) {
        const property = await this.propertyService.changeVisibility(propertyId);

        if (property)
            return property;

        throw new HttpException("Property Not found", HttpStatus.NOT_FOUND)
    }

    
    @Put('/update/:property_id')
    async update(@Param("property_id") propertyId: number, @Body() property: PropertyDto) {
        const response = await this.propertyService.update(propertyId, property);

        if (response)
            return response;

        throw new HttpException("Property not found", HttpStatus.NOT_FOUND)
    }

    // Controller to rate a property
    @SkipAuth()
    @Put('/rate/:property_id')
    async rateProperty(@Param("property_id") propertyId: number, @Body() propertyWithNewRate: PropertyDto) {
        const result = await this.propertyService.ratePoperty(propertyId, propertyWithNewRate.rate);

        if (result != null)
            return result;
        if (result == "The rate must be less than 5.0")
            return "The rate must be less than 5.0"

        throw new HttpException("Property not found", HttpStatus.NOT_FOUND)

    }
}
