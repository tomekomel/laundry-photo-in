import { Controller, Get, Render, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';

@Controller('users')
export class UserController {
  @Get('/profile')
  @UseGuards(AuthenticatedGuard)
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user }
  }
}
