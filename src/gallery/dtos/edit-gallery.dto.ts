import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PhotoDto } from './photo.dto';

export class EditGalleryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsString()
  description: string;

  @IsOptional()
  latitude: number;

  @IsOptional()
  longitude: number;

  photos: PhotoDto[];
}
