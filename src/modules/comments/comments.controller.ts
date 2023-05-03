import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from 'src/dtos/Comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(
        private readonly commentsService: CommentsService
    ) {}

    @Get()
    getAllComments() {
        return this.commentsService.findAll();
    }

    @Post('/:property_id')
    async commentProperty(@Param('property_id') propertyId: number, @Body() comment: CommentDto) {
        const result = await this.commentsService.commentProperty(propertyId, comment);

        if (result)
            return result;
        
        throw new HttpException("Can't comment the property maybe property not found", HttpStatus.NOT_FOUND);
    }
}
