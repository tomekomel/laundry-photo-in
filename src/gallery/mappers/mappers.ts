import { GalleryDto } from '../dtos/gallery.dto';
import { Gallery } from '../entities/gallery.entity';
import { PhotoDto } from '../dtos/photo.dto';
import { Photo } from '../entities/photo.entity';

export const mapToGalleryDto = (gallery: Gallery): GalleryDto => {
  let galleryDto: GalleryDto = {
    id: gallery.id,
    title: gallery.title,
    description: gallery.description,
    userName: gallery.user.name,
    created: gallery.created.toLocaleString('pl-PL'),
    latitude: gallery.latitude,
    longitude: gallery.longitude,
  };

  if (gallery.photos.length) {
    galleryDto = {
      ...galleryDto,
      photo: gallery.photos[0].fileName,
    };
  }

  if (gallery.country) {
    galleryDto = {
      ...galleryDto,
      country: gallery.country.name,
    };
  }

  return galleryDto;
};

export const mapToPhoto = (photoDto: PhotoDto): Photo => {
  const photo = new Photo();
  photo.id = +photoDto.photoId;
  photo.title = photoDto.title;
  photo.description = photoDto.description;
  return photo;
}
