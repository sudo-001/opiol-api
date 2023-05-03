import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/Comment.entity';
import { PropertyEntity } from 'src/entities/Property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, PropertyEntity])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
