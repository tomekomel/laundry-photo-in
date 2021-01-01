import { ConflictException } from '@nestjs/common';

export class UserNameAlreadyExistsException extends ConflictException {
  constructor(name: string) {
    super(`User name: ${name} already exists`);
  }
}
