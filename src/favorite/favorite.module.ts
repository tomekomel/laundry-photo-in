import { Module } from '@nestjs/common';
import { FavoriteController } from './controllers/favorite.controller';

@Module({
  controllers: [FavoriteController]
})
export class FavoriteModule {}
