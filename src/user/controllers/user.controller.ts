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
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { AuthExceptionFilter } from '../../common/filters/auth-exceptions.filter';
import { Response } from 'express';
import { EditUserDto } from '../dtos/edit-user.dto';
import { UserService } from '../services/user.service';

@UseFilters(AuthExceptionFilter)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthenticatedGuard)
  @Render('profile')
  getUser(@Request() req) {
    return { user: req.user };
  }

  @Post()
  async saveUser(@Body() editUserDto: EditUserDto, @Res() response: Response) {
    await this.userService.save(editUserDto);
    response.redirect('users/profile');
  }

  @Get('/:userId')
  @UseGuards(AuthenticatedGuard)
  @Render('edit-profile')
  async editUser(@Request() req) {
    const user = await this.userService.findOne(req.user.id);
    return { user };
  }
}
