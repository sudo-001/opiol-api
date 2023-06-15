import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PictureDto } from 'src/dtos/Picture.dto';
import { PropertyDto } from 'src/dtos/Property.dto';
import { LandlordEntity } from 'src/entities/Landlord.entity';
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
        @InjectRepository(LandlordEntity)
        private readonly landlordRepository: Repository<LandlordEntity>,
    ) {}

    // Service to find all properties
    findAll():Promise<PropertyEntity[]> {
        const properties = this.propertyRepository.find({ relations: ["comments", "pictures", "owner", "occupant"]});

        return properties;
    }


    // Service to update a property
    async update(propertyId: number, propertyToUpdate: PropertyDto) {
        const property = await this.propertyRepository.findOne({
            where: { id: propertyId },
            relations: ["comments","pictures","owner","occupant"]
        });

        if (!property)
            return null;
        
        const response = await this.propertyRepository.update(propertyId, propertyToUpdate);

        return response;
    }

    // Service to find a specific property
    findOne(id: number) {
        const property = this.propertyRepository.findOne({
            where: {id: id},
            relations: ["comments", "pictures", "owner", "occupant"]
        })

        if (property)
            return property;
        return null;
    }

    // Service to find properties by countries
    findByCountry(country: string) {
        const properties = this.propertyRepository.find({
            where: { pays: country },
            relations: ["comments", "pictures", "owner", "occupant"],
        })

        return properties;
    }

    // Service to find properties by city
    findByCity(city: string) {
        const properties = this.propertyRepository.find({
            where: { ville: city },
            relations: ["comments", "pictures", "owner", "occupant"]
        })

        return properties;
    }

    // Service to find properties by 'quartier'
    findByQuartier(quartier: string) {
        const properties = this.propertyRepository.find({
            where: { quartier: quartier },
            relations: ["comments", "pictures", "owner", "occupant"]
        })

        return properties;
    }

    async createProperty(property: PropertyDto, ownerId: number): Promise<any>{
        // Have to check images before save it
        const landlord = await this.landlordRepository.findOne({
            where: { id: ownerId },
            relations: ["properties"],
        });

        if (!landlord)
            return null;
        
        const response = await this.propertyRepository.save(property);
        response.owner = landlord;
        return await this.propertyRepository.save(response);
        // landlord.properties.push(response);
        

        // await this.landlordRepository.update(ownerId, landlord);
        // return response;
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

        // await this.propertyRepository.update(propertyId, property);

        return await this.propertyRepository.findOne({
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

    // Change visibility of a property
    async changeVisibility(propertyId: number) {
        const property = await this.propertyRepository.findOne({
            where: {id: propertyId}
        });
        
        if (!property)
            return null;
        
        property.visible = !property.visible

        return this.propertyRepository.save(property);
    }

    // Rate a property
    async ratePoperty(propertyId: number, rate: number) {
        const property = await this.propertyRepository.findOne({
            where: {id: propertyId}
        });

        if (!property)
            return null;
        
        if (rate >= 5.0)
            return "The rate must be less than 5.0"
        
        property.rate = rate;

        return this.propertyRepository.save(property);
    }
}
