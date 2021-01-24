import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';

import { CommentService } from '../services/comment.service';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { Response } from 'express';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Res() response: Response,
  ) {
    await this.commentService.create(createCommentDto);
    response.redirect(`/galleries/${createCommentDto.galleryId}#comments`);
  }
}
