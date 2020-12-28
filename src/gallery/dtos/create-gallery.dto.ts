import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  country: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
