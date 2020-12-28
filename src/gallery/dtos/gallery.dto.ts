import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GalleryDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  country: string;

  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  created: string;
}
