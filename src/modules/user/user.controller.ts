import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/User.entity';
import { UserDto } from 'src/dtos/User.dto';
import { SkipAuth } from 'src/decorators/SkipAuth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }*/

  @SkipAuth()
  @Post()
  async create(@Body() user: UserDto) {
    const response = await this.userService.createUser(user);

    if (response)
      return response;

    throw new HttpException("It seem like an error occur in server, or this email already exist", HttpStatus.INTERNAL_SERVER_ERROR);
  }


  @SkipAuth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @SkipAuth()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/user',
      filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    })
  }))
  @Post('picture/:user_id')
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
    ) file: Express.Multer.File, @Param("user_id") userId: number) {

    // console.log(file);

    const user = await this.userService.addPictureToUser(userId, file);

    if (user)
      return user;

    throw new HttpException("Can't add picture to the user", HttpStatus.NOT_MODIFIED)

    // return "File uploaded";
  }

  @Get(':user_id')
  async findOne(@Param('user_id') userId: string) {
    const user = await this.userService.findOne(parseInt(userId));
    if (user)
      return user;
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  @Put("/update/:user_id")
  async update(@Param("user_id") userId: number, @Body() user: UserDto) {
    const response = await this.userService.update(userId, user);

    if (response)
      return response;

    throw new HttpException("User not found", HttpStatus.NOT_FOUND)
  }

  @Delete(':user_id')
  async remove(@Param('user_id') userId: string) {
    const user = await this.userService.setToDeleted(parseInt(userId));
    if (user)
      return user;
    throw new HttpException("user not found", HttpStatus.NOT_FOUND);
  }
}
