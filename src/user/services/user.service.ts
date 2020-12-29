import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
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
}
