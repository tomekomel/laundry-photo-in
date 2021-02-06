import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GalleryListDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  created: string;
}
