import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
})
export class CommentModule {}
