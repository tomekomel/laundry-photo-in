import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CountryDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
