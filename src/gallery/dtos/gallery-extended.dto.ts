import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GalleryExtendedDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  created: Date;

  @IsString()
  updated: Date;

  @IsBoolean()
  deleted: boolean;
}
