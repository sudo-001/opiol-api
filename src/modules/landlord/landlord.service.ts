import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandlordEntity } from 'src/entities/Landlord.entity';
import { promises } from 'dns';
import { LandlordDto } from 'src/dtos/Landlord.dto';
import * as bcrypt from 'bcrypt';
import { PictureDto } from 'src/dtos/Picture.dto';
import { PictureEntity } from 'src/entities/Picture.entity';


@Injectable()
export class LandlordService {

  constructor(
    @InjectRepository(LandlordEntity)
    private readonly landlordRepository: Repository<LandlordEntity>,
    @InjectRepository(PictureEntity)
    private readonly pictureRepository: Repository<PictureEntity>,

  ) { }

  async createUser(landlord: LandlordDto) {
    const isLandlordExist = await this.landlordRepository.findOne({
      where: { email: landlord.email }
    });

    if (isLandlordExist != null )
      return null;
    
    const hash = await bcrypt.hash(landlord.password, 10);
    landlord.password = hash;
    
    const response = await this.landlordRepository.save(landlord);
    return response;
  }

  async addPictureToLandlord(landlordId: number, picture: PictureDto ) {
    const landlord = await this.landlordRepository.findOne({
      where: { id: landlordId },
      relations: ["picture"]
    });

    if (!landlord)
      return null;
    
    const tmpPic = await this.pictureRepository.save(picture);
    landlord.picture = tmpPic;

    await this.landlordRepository.update(landlord.id, landlord);

    return landlord;
    // return await this.landlordRepository.findOne({
    //   where: {id: landlordId},
    //   relations: ["picture"],
    // })

  }

  findAll(): Promise<LandlordEntity[]> {
    const landlords = this.landlordRepository.find();
    return landlords;
  }

  findOne(id: number) {
    const landlord = this.landlordRepository.findOne({
      where: { id: id},
      relations: ["favorites","payments","picture"]
    })
    if (landlord)
      return landlord;
    return null;
  }
  
  async update(landlordId: number, landlordToUpdate: LandlordDto) {
    const landlord = await this.landlordRepository.findOne({
      where: { id: landlordId }
    });

    if (!landlord)
      return null;
    
    const response = await this.landlordRepository.update(landlordId, landlordToUpdate);

    return response;
  }

  async setToDeleted(id: number) {
    const landlord = await this.landlordRepository.findOneBy({
      id: id
    })
    if (!landlord)
      return null;

    this.landlordRepository.remove(landlord);
    return landlord;
  }

}