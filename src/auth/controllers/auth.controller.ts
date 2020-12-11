import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from '../guards/login.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('login')
  async displayLogin() {
    return;
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
