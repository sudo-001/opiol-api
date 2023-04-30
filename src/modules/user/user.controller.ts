import { Controller, Delete, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/User.entity';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }*/

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':user_id')
  async findOne(@Param('user_id') userId: string) {
    const user = await this.userService.findOne(parseInt(userId));
    if (user)
        return user;
    throw new HttpException("Entity not found", HttpStatus.NOT_FOUND);
  
  }

  

  @Delete(':user_id')
  async remove(@Param('user_id') userId: string) {
      const user = await this.userService.setToDeleted(parseInt(userId));
      if (user)
          return user;
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
  }



}
