import { ConflictException } from '@nestjs/common';

export class PasswordMismatchException extends ConflictException {
  constructor(userId: number) {
    super(`UserId ${userId} password mismatch. Try again!`);
  }
}
