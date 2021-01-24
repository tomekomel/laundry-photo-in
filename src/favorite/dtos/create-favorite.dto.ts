import { IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  photoId: number;
}
