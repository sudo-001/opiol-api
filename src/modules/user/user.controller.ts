import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/User.entity';
import { UserDto } from 'src/dtos/User.dto';
import { SkipAuth } from 'src/decorators/SkipAuth.decorator';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

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
