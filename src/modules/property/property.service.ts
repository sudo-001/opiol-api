import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyDto } from 'src/dtos/Property.dto';
import { PropertyEntity } from 'src/entities/Property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {

    constructor(
        @InjectRepository(PropertyEntity)
        private readonly propertyRepository: Repository<PropertyEntity>,
    ) {}

    findAll():Promise<PropertyEntity[]> {
        const properties = this.propertyRepository.find();

        return properties;
    }

    findOne(id: number) {
        const property = this.propertyRepository.findOneBy({
            id: id,
        })

        if (property)
            return property;
        return null;
    }


    async createProperty(property: PropertyDto): Promise<any>{
        // Have to check images before save it
        // 
        
        const response = await this.propertyRepository.save(property);
        return property;
    }

    async setToDeleted(id: number) {
        const property = await this.propertyRepository.findOneBy({
            id: id
        })

        if (!property)
            return null;
        
        this.propertyRepository.remove(property);

        return property;
    }




}
