import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PictureDto } from 'src/dtos/Picture.dto';
import { PropertyDto } from 'src/dtos/Property.dto';
import { PictureEntity } from 'src/entities/Picture.entity';
import { PropertyEntity } from 'src/entities/Property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {

    constructor(
        @InjectRepository(PropertyEntity)
        private readonly propertyRepository: Repository<PropertyEntity>,
        @InjectRepository(PictureEntity)
        private readonly pictureRepository: Repository<PictureEntity>,
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

    async addPicturesToProperty(propertyId: number, pictures: PictureDto[]) {
        const property = await this.propertyRepository.findOne({ where: {id: propertyId}, relations: ['pictures']});

        // let picturesSaved = [];

        if (!property)
            return null;
        
        pictures.forEach(async picture => {
            let tmpPic = await this.pictureRepository.save(picture);
            tmpPic.property = property;
            this.pictureRepository.update(tmpPic.id, tmpPic)

            property.pictures.push(tmpPic);
        });

        await this.propertyRepository.update(propertyId, property);

        return this.propertyRepository.findOne({
            where: {id: propertyId},
            relations: ['pictures', 'comments', 'owner', 'occupant'],
        })

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
