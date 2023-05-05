import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'src/dtos/Comment.dto';
import { CommentEntity } from 'src/entities/Comment.entity';
import { PropertyEntity } from 'src/entities/Property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly CommentsRepository: Repository<CommentEntity>,
        @InjectRepository(PropertyEntity)
        private readonly PropertyRepository: Repository<PropertyEntity>
    ) {}

    findAll() {
        return this.CommentsRepository.find({
            relations: ['property']
        })
    }

    // Add comment to a property
    async commentProperty(propertyId: number, commentToAdd: CommentDto) {
        const property = await this.PropertyRepository.findOne({
            where: {id: propertyId}
        })

        if (!property)
            return null;
        
        const comment = new CommentEntity();
        comment.text = commentToAdd.text;
        comment.property = property;

        return this.CommentsRepository.save(comment);

    }

    // Change the visibility of a comment
    async changeVisibility(commentId: number) {
        const comment = await this.CommentsRepository.findOne({
            where: {id: commentId}
        });

        if (!comment)
            return null;

        comment.visible = !comment.visible;

        return this.CommentsRepository.save(comment);
    }

}
