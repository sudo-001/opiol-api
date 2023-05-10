import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/User.entity';
import { UserDto } from 'src/dtos/User.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }*/

  @Post()
  create(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

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
