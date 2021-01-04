import { IsNotEmpty, IsString } from 'class-validator';
import { PhotoDto } from './photo.dto';

export class EditGalleryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  photos: PhotoDto[];
}
