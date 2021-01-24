import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  galleryId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
