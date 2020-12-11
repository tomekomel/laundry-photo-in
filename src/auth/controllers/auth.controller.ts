import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from '../guards/login.guard';
import { Response } from 'express';
import { AuthExceptionFilter } from '../../common/filters/auth-exceptions.filter';

@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('login')
  async (@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Res() res: Response) {
    res.redirect('/users/profile');
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }
}
