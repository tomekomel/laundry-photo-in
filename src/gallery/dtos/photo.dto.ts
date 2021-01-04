import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PhotoDto {
  @IsNotEmpty()
  @IsString()
  photoId: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
