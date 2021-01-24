import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Comment } from '../entities/comment.entity';
import { Gallery } from '../../gallery/entities/gallery.entity';
import { User } from '../../user/entities/user.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CommentDto } from '../dtos/comment.dto';
import { mapToCommentDto } from '../mappers/comment.mapper';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async delete(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    const gallery = new Gallery();
    const user = new User();

    comment.content = createCommentDto.content;
    user.id = +createCommentDto.userId;
    gallery.id = +createCommentDto.galleryId;
    comment.gallery = gallery;
    comment.user = user;

    return await this.commentRepository.save(comment);
  }

  async findAll(galleryId = 0): Promise<CommentDto[]> {
    let whereConditions = {};

    if (galleryId) {
      whereConditions = { gallery: { id: galleryId } };
    }

    return (
      await this.commentRepository.find({
        relations: ['gallery'],
        where: whereConditions,
        order: { created: 'ASC' },
      })
    ).map(comment => mapToCommentDto(comment));
  }
}
