import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GalleryDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  countryId: number | null;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  created: string;
}
