import { IsNumber } from 'class-validator';
import { EditUserDto } from './edit-user.dto';

export class SaveUserDto extends EditUserDto {
  @IsNumber()
  userId: number;
}
