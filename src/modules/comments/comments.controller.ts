import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from 'src/dtos/Comment.dto';
import { SkipAuth } from 'src/decorators/SkipAuth.decorator';

@Controller('comments')
export class CommentsController {

    constructor(
        private readonly commentsService: CommentsService
    ) {}

    @SkipAuth()
    @Get()
    getAllComments() {
        return this.commentsService.findAll();
    }

    @SkipAuth()
    @Post('/:property_id')
    async commentProperty(@Param('property_id') propertyId: number, @Body() comment: CommentDto) {
        const result = await this.commentsService.commentProperty(propertyId, comment);

        if (result)
            return result;
        
        throw new HttpException("Can't comment the property maybe property not found", HttpStatus.NOT_FOUND);
    }

    // Function to change the visibility of a comment
    @Put('/:comment_id')
    async changeVisibility(@Param('comment_id') commentId: number) {
        const comment = await this.commentsService.changeVisibility(commentId);

        if (comment)
            return comment;
        
        throw new HttpException("Comment not found", HttpStatus.NOT_FOUND)
    }
}
