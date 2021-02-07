import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GalleryDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  photos?: {
    id: number;
    fileName: string;
    alt: string;
    title: string;
  }[];

  @IsOptional()
  comments?: {
    content: string;
    created: string;
    userName: string;
  }[];

  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  created: string;
}
