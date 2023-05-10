import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dtos/User.dto';
import { UserEntity } from 'src/entities/User.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

  ) { }

  async createUser(user: UserDto) {
    const response = await this.userRepository.save(user);
  }


  findAll(): Promise<UserEntity[]> {
    const users = this.userRepository.find();
    return users;
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({
      id: id,
    })
    if (user)
      return user;
    return null;
  }

  async update(userId: number, userToUpdate: UserDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user)
      return null;
    
    const response = await this.userRepository.update(userId, userToUpdate);

    return response;
  }

  async setToDeleted(id: number) {
    const user = await this.userRepository.findOneBy({
      id: id
    })
    if (!user)
      return null;

    this.userRepository.remove(user);
    return user;
  }

}
