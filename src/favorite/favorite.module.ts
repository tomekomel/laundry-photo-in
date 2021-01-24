import { Module } from '@nestjs/common';
import { FavoriteController } from './controllers/favorite.controller';
import { FavoriteService } from './services/favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
