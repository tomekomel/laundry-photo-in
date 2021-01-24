import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateFavoriteDto } from '../dtos/create-favorite.dto';
import { Response } from 'express';
import { FavoriteService } from '../services/favorite.service';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async createFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Res() response: Response,
  ) {
    await this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  async getFavorites() {
    return await this.favoriteService.findByUserId(1);
  }
}
