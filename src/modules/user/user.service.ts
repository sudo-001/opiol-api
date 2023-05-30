import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dtos/User.dto';
import { UserEntity } from 'src/entities/User.entity';
import * as bcrypt from 'bcrypt';
import { PictureDto } from 'src/dtos/Picture.dto';
import { PictureEntity } from 'src/entities/Picture.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PictureEntity)
    private readonly pictureRepository: Repository<PictureEntity>,

  ) { }


  async addPictureToUser(userId: number, picture: PictureDto ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["picture"]
    });

    if (!user)
      return null;
    
    const tmpPic = await this.pictureRepository.save(picture);
    user.picture = tmpPic;

    this.userRepository.update(user.id, user);

    return await this.userRepository.findOne({
      where: {id: userId},
      relations: ["picture"],
    })

  }

  async createUser(userDto: UserDto) {
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (user != null)
      return null;
    
    const hash = await bcrypt.hash(userDto.password, 10);
    userDto.password = hash;

    return await this.userRepository.save(userDto);
  }


  findAll(): Promise<UserEntity[]> {
    const users = this.userRepository.find({
      relations: ["favorites","payments","OccupiedProperties"]
    });
    return users;
  }

  findOne(id: number) {
    const user = this.userRepository.findOne({
      where: { id: id },
      relations: ["favorites","payments","OccupiedProperties"]
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

  testfunction(): string {
    return 'User controller test';
  }
}
