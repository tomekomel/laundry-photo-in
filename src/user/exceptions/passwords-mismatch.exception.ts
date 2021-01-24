import { ConflictException } from '@nestjs/common';

export class PasswordsMismatchException extends ConflictException {
  constructor() {
    super('Password and Repeat Password fields do not match');
  }
}
