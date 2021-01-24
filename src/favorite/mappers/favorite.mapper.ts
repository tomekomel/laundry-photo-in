import { Favorite } from '../entities/favorite.entity';
import { FavoriteDto } from '../dtos/favorite.dto';

export const mapToFavoriteDto = (favorite: Favorite): FavoriteDto => {
  return {
    id: favorite.id,
    photoId: favorite.photo.id,
    fileName: favorite.photo.fileName,
    galleryId: favorite.photo.gallery.id,
    title: favorite.photo.title,
    description: favorite.photo.description,
  }
};
