import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  photoId: number;

  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsNumber()
  galleryId: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
