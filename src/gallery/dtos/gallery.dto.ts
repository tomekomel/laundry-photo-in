import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GalleryDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  created: string;
}
