import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    async setToDeleted(id: number) {
        const property = await this.propertyRepository.findOneBy({
            id: id
        })

        // if (!property)
        //     return null;
        
        // this.propertyRepository.remove(property);

        return property;
    }


}
