import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateFavoriteDto } from '../dtos/create-favorite.dto';
import { FavoriteService } from '../services/favorite.service';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto
  ) {
    await this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  async getFavorites() {
    return await this.favoriteService.findByUserId(1);
  }
}
