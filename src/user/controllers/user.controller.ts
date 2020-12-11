import { Controller, Get, Render } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('/profile')
  @Render('profile')
  getProfile() {
    return;
  }
}
