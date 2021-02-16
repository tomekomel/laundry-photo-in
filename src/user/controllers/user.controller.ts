import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Render,
  Req,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { AuthExceptionFilter } from '../../common/filters/auth-exceptions.filter';
import { Response, Request as RequestObject } from 'express';
import { EditUserDto } from '../dtos/edit-user.dto';
import { UserService } from '../services/user.service';

@UseGuards(AuthenticatedGuard)
@UseFilters(AuthExceptionFilter)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @Render('profile')
  getUser(@Request() req) {
    return { user: req.user };
  }

  @Post('/:userId')
  async saveUser(
    @Body() editUserDto: EditUserDto,
    @Param('userId', ParseIntPipe) userId: number,
    @Res() response: Response,
    @Req() request: RequestObject,
  ) {
    try {
      await this.userService.save({ ...editUserDto, userId });
      response.redirect('profile');
    } catch (e) {
      request.flash('error', e.message);
      response.redirect(`/users/${userId}`);
    }
  }

  @Get('/:userId')
  @Render('edit-profile')
  async editUser(@Request() request) {
    const user = await this.userService.findOne(request.user.id);
    return { user, message: request.flash('error') };
  }
}
