import { GalleryListDto } from '../dtos/gallery-list.dto';
import { Gallery } from '../entities/gallery.entity';
import { PhotoDto } from '../dtos/photo.dto';
import { Photo } from '../entities/photo.entity';
import { GalleryDto } from '../dtos/gallery.dto';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const mapToGalleryListDto = (gallery: Gallery): GalleryListDto => {
  let galleryListDto: GalleryListDto = {
    id: gallery.id,
    title: gallery.title,
    description: gallery.description,
    userName: gallery.user.name,
    created: gallery.created.toLocaleString('pl-PL'),
    latitude: gallery.latitude,
    longitude: gallery.longitude,
  };

  if (gallery.photos.length) {
    galleryListDto = {
      ...galleryListDto,
      photo: gallery.photos[0].fileName,
    };
  }

  if (gallery.country) {
    galleryListDto = {
      ...galleryListDto,
      country: gallery.country.name,
    };
  }

  return galleryListDto;
};

export const mapToGalleryDto = (gallery: Gallery): GalleryDto => {
  let galleryDto: GalleryDto = {
    id: gallery.id,
    title: gallery.title,
    description: gallery.description,
    userName: gallery.user.name,
    created: dayjs(gallery.created.toLocaleString('pl-PL')).format(),
    latitude: gallery.latitude,
    longitude: gallery.longitude,
  };

  if (gallery.photos.length) {
    galleryDto = {
      ...galleryDto,
      photos: gallery.photos.map(photo => ({
        fileName: photo.fileName,
        alt: photo.alt,
        title: photo.title,
      })),
    };
  }

  if (gallery.comments.length) {
    galleryDto = {
      ...galleryDto,
      comments: gallery.comments.map(comment => ({
        content: comment.content,
        created: dayjs().to(dayjs(comment.created)),
        userName: comment.user.name,
      })),
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
