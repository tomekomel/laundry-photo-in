import {
  Body,
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
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { UserService } from '../../user/services/user.service';

@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  @Render('login')
  async loginView(
    @Request() req,
  ): Promise<{ message: string; userId: string }> {
    return {
      message: req.flash('loginError'),
      userId: req.user ? req.user.id : 0,
    };
  }

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Res() res: Response) {
    res.redirect('/users/profile');
  }

  @Get('logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

  @Get('register')
  @Render('register')
  async registerView(@Request() req) {
    return {
      message: req.flash('loginError'),
      userId: req.user ? req.user.id : 0,
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.userService.create(createUserDto);
    res.redirect('/auth/registered');
  }

  @Get('registered')
  @Render('registered')
  async registeredView() {
    return;
  }
}
