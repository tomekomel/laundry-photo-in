import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateFavoriteDto } from '../dtos/create-favorite.dto';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteDto } from '../dtos/favorite.dto';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
    await this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  async getFavorites(@Query('userId') userId: number): Promise<FavoriteDto[]> {
    return await this.favoriteService.findByUserId(userId);
  }

  @Get('my')
  @Render('favorites')
  @UseGuards(AuthenticatedGuard)
  async getFavoritesView(@Query('userId') userId: number, @Req() request) {
    return {
      favorites: await this.favoriteService.findByUserId(request.user.id),
    };
  }
}
