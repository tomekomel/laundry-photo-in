import { ConflictException } from '@nestjs/common';

export class EmailsMismatchException extends ConflictException {
  constructor() {
    super('Email and Repeat Email fields do not match');
  }
}
