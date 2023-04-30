import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { promises } from 'dns';

@Injectable()
export class UserService {
  
  constructor (
      @InjectRepository (UserEntity)
      private readonly userRepository: Repository<UserEntity>,

  ) {}
 
 

  findAll() : Promise<UserEntity[]>{
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
