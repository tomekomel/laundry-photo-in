import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EditUserDto } from '../dtos/edit-user.dto';
import { PasswordMismatchException } from '../exceptions/password-mismatch.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByName(name: string): Promise<User> {
    return this.userRepository.findOne({ name });
  }

  async create(userDto: CreateUserDto) {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    await this.userRepository.save(user);
  }

  async save(editUserDto: EditUserDto) {
    const user = await this.findOne((editUserDto.userId as unknown) as number);

    if (editUserDto.newPassword !== '') {
      if (!(await user.comparePassword(editUserDto.password))) {
        throw new PasswordMismatchException(user.id);
      }
      user.password = editUserDto.newPassword;
      await user.generatePasswordHash();
    }

    user.name = editUserDto.name !== '' ? editUserDto.name : user.name;
    user.email = editUserDto.email !== '' ? editUserDto.email : user.email;

    await this.userRepository.save(user);
  }
}
