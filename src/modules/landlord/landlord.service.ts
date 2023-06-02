import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandlordEntity } from 'src/entities/Landlord.entity';
import { promises } from 'dns';
import { LandlordDto } from 'src/dtos/Landlord.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class LandlordService {

  constructor(
    @InjectRepository(LandlordEntity)
    private readonly landlordRepository: Repository<LandlordEntity>,

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

  findAll(): Promise<LandlordEntity[]> {
    const landlords = this.landlordRepository.find();
    return landlords;
  }

  findOne(id: number) {
    const landlord = this.landlordRepository.findOneBy({
      id: id,
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