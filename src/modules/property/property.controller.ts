import { Body, Controller, Delete, FileTypeValidator, Get, HttpException, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyEntity } from 'src/entities/Property.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PropertyDto } from 'src/dtos/Property.dto';

@Controller('property')
export class PropertyController {

    constructor(
        private readonly propertyService: PropertyService
    ) { }


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


    // @UseInterceptors(FileInterceptor('file', {
    //     storage: diskStorage({
    //         destination: './properties',
    //         filename(req, file, callback) {
    //             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //             const ext = extname(file.originalname);
    //             const filename = `${uniqueSuffix}${ext}`;
    //             callback(null, filename);
    //         },
    //     })
    // }))
    // @Post('file')
    // uploadUserPicture(
    //     @UploadedFile( 
    //         new ParseFilePipeBuilder()
    //         .addFileTypeValidator({
    //             fileType: 'jpeg',
    //         })
    //         .addMaxSizeValidator({
    //             maxSize: 1500
    //         })
    //         .build({
    //             errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    //         }),
    //     ) file: Express.Multer.File) {
    //     console.log(file);

    //     return "File uploaded";
    // }

    
    // Upload d'un tableau d'images
    @Post('/pictures/:article_id')
    @UseInterceptors(FilesInterceptor('files',3,{
        storage: diskStorage({
            destination: './properties',
            filename(req, file, callback) {
                const fileNameSplit = file.originalname.split(".");
                const fileExt = fileNameSplit[fileNameSplit.length - 1 ];
                callback(null, `${Date.now()}.${fileExt}`);
            }
        }),
    }))
    async uploadPictures(
        @UploadedFiles(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({
            fileType: 'jpeg',
        })
        .addMaxSizeValidator({
            maxSize: 1500
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
        )
     pictures: Array<Express.Multer.File>,
     @Param('article_id') articleId: string
     ) {
        console.log(pictures)

        const property = await this.propertyService.addPicturesToProperty(parseInt(articleId), pictures);

        if (property)
            return property;
        
        throw new HttpException("Can't add pictures to the property", HttpStatus.NOT_MODIFIED)
    }


    // Route pour créer ajouter une propiété à la base de données proprement dite
    @Post()
    async creteProperty(@Body() property: PropertyDto) {
        const propertyAdded = await this.propertyService.createProperty(property);

        if (propertyAdded)
            return propertyAdded;
        
        throw new HttpException("Can't create an article", HttpStatus.NOT_MODIFIED)
    }

    @Delete(':property_id')
    async remove(@Param('property_id') propertyId: string) {
        const property = await this.propertyService.setToDeleted(parseInt(propertyId));

        if (property)
            return property;
        throw new HttpException("Property not found", HttpStatus.NOT_FOUND);
    }

}
