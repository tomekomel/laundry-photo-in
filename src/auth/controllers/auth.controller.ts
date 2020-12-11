import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('login')
  async displayLogin() {
    return;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('/logout')
  logout(@Res() res: Response): void {
    res.redirect('/');
  }
}
