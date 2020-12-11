import { Controller, Get, Render, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { AuthExceptionFilter } from '../../common/filters/auth-exceptions.filter';

@UseFilters(AuthExceptionFilter)
@Controller('users')
export class UserController {
  @Get('/profile')
  @UseGuards(AuthenticatedGuard)
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user }
  }
}
