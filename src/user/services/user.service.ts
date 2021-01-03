import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PasswordMismatchException } from '../exceptions/password-mismatch.exception';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserNameAlreadyExistsException } from '../exceptions/user-name-already-exists.exception';
import { SaveUserDto } from '../dtos/save-user.dto';

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
    const { name, email, password } = userDto;

    const existingUser = await this.findOneByName(name);

    if (existingUser) {
      throw new UserNameAlreadyExistsException(name);
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await this.userRepository.save(user);
  }

  async save(saveUserDto: SaveUserDto) {
    const user = await this.findOne(saveUserDto.userId);

    if (!user) {
      throw new UserNotFoundException(saveUserDto.userId);
    }

    if (saveUserDto.newPassword) {
      if (!(await user.comparePassword(saveUserDto.password))) {
        throw new PasswordMismatchException(user.id);
      }
      user.password = saveUserDto.newPassword;
      await user.generatePasswordHash();
    }

    user.name = saveUserDto.name ? saveUserDto.name : user.name;
    user.email = saveUserDto.email ? saveUserDto.email : user.email;

    await this.userRepository.save(user);
  }
}
