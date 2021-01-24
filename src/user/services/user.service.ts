import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PasswordsMismatchException } from '../exceptions/passwords-mismatch.exception';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserNameAlreadyExistsException } from '../exceptions/user-name-already-exists.exception';
import { SaveUserDto } from '../dtos/save-user.dto';
import { EmailsMismatchException } from '../exceptions/emails-mismatch.exception'
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
    this.validateCreateUserDto(userDto);
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

  private validateCreateUserDto(userDto: CreateUserDto) {
    const { email, email2, password, password2 } = userDto;

    if (email !== email2) {
      throw new EmailsMismatchException();
    }

    if (password !== password2) {
      throw new PasswordsMismatchException();
    }
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
