import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordEntity } from 'src/entities/Landlord.entity';
import { LandlordDto } from 'src/dtos/Landlord.dto';
import { SkipAuth } from 'src/decorators/SkipAuth.decorator';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';


@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  /*@Post()
  create(@Body() createLandlordDto: CreateLandlordDto) {
    return this.landlordService.create(createLandlordDto);
  }*/
  @SkipAuth()
  @Get()
  findAll() {
    return this.landlordService.findAll();
  }

  @SkipAuth()
  @Post()
  async createLandlord(@Body() lanldlor: LandlordDto) {
    const landlord = await this.landlordService.createUser(lanldlor);

    if (landlord)
      return landlord;
    
    throw new HttpException("C'ant create the lanldord, it seem like there is an error with the connection to database", HttpStatus.NOT_MODIFIED)
  }

  @SkipAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/landlord',
      filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    })
  }))
  @Post('picture/:landlord_id')
  async uploadUserPicture(
    @UploadedFile(
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
    ) file: Express.Multer.File, @Param("landlord_id") landlordId: number) {

    // console.log(file);

    const user = await this.landlordService.addPictureToLandlord(landlordId, file);

    if (user)
      return user;

    throw new HttpException("Can't add picture to the landlord", HttpStatus.NOT_MODIFIED)

    // return "File uploaded";
  }

  @Put("/update/:landlord_id")
  async update(@Param("landlord_id") landlordId: number,@Body() landlord: LandlordDto) {
    const response = await this.landlordService.update(landlordId, landlord);

    if (response)
      return response;

    throw new HttpException("Landlord not found", HttpStatus.NOT_FOUND);
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
 
 

