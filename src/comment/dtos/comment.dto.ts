import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  created: string;
}
