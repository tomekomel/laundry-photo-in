import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '../entities/favorite.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from '../dtos/create-favorite.dto';
import { Photo } from '../../gallery/entities/photo.entity';
import { User } from '../../user/entities/user.entity';
import { mapToFavoriteDto } from '../mappers/favorite.mapper';
import { FavoriteDto } from '../dtos/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const favorite = new Favorite();
    const photo = new Photo();
    const user = new User();

    photo.id = +createFavoriteDto.photoId;
    user.id = +createFavoriteDto.userId;
    favorite.photo = photo;
    favorite.user = user;

    await this.favoriteRepository.save(favorite);
  }

  async findByUserId(userId: number): Promise<FavoriteDto[]> {
    return (await this.favoriteRepository
      .find({
        relations: ['photo', 'photo.gallery'],
        where: { user: { id: userId } },
        order: { created: 'ASC' },
      }))
      .map((favorite) => mapToFavoriteDto(favorite));
  }
}
