import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Render,
  Req,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from '../guards/login.guard';
import { Request as RequestObject, Response } from 'express';
import { AuthExceptionFilter } from '../../common/filters/auth-exceptions.filter';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { UserService } from '../../user/services/user.service';
import { Recaptcha } from '@nestlab/google-recaptcha';

@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  @Render('login')
  async loginView(
    @Req() request,
  ): Promise<{ message: string; userId: string }> {
    return {
      message: request.flash('info'),
      userId: request.user ? request.user.id : 0,
    };
  }

  @Get('/:uuid/activate')
  @Render('activated')
  async activate(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() response: Response,
    @Req() request: RequestObject,
  ) {
    try {
      await this.userService.activate(uuid);
    } catch (e) {
      Logger.error('Activation error', e);
      return {
        error: 'Your account has not been activated.',
      };
    }
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
      message: req.flash('info'),
      userId: req.user ? req.user.id : 0,
    };
  }

  @Recaptcha({ response: (req) => req.body['g-recaptcha-response'] })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Request() req,
    @Res() res: Response,
  ) {
    try {
      await this.userService.create(createUserDto);
      res.redirect('/auth/registered');
    } catch (e) {
      req.flash('loginError', e.message);
      res.redirect('/auth/register');
    }
  }

  @Get('registered')
  @Render('registered')
  async registeredView() {
    return;
  }
}
