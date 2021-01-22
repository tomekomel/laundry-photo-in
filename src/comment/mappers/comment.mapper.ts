import { Comment } from '../entities/comment.entity';
import { CommentDto } from '../dtos/comment.dto';

export const mapToCommentDto = (comment: Comment): CommentDto => {
  return {
    id: comment.id,
    content: comment.content,
    created: comment.created.toLocaleString('pl-PL'),
  };
};
