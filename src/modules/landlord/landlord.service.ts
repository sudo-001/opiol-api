import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandlordEntity } from 'src/entities/Landlord.entity';
import { promises } from 'dns';
import { LandlordDto } from 'src/dtos/Landlord.dto';


@Injectable()
export class LandlordService {
  
  constructor (
      @InjectRepository (LandlordEntity)
      private readonly landlordRepository: Repository<LandlordEntity>,

  ) {}
 
 async createUser(landlord: LandlordDto) {
    const response = await this.landlordRepository.save(landlord);
    return response;
 }

  findAll() : Promise<LandlordEntity[]>{
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
















