import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Photo } from '../entities/photo.entity';
import { Gallery } from '../entities/gallery.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async saveUploadedPhotos(
    photoFiles: Express.Multer.File[],
    galleryId: number,
  ) {
    const gallery = new Gallery();
    gallery.id = galleryId;

    const photos = photoFiles.map((photoFile) => {
      const photo = new Photo();
      photo.fileName = photoFile.filename;
      photo.gallery = gallery;
      photo.title = '';
      photo.description = '';
      photo.alt = '';
      return photo;
    });

    const savePhotoPromises = photos.map((photo) =>
      this.photoRepository.save(photo),
    );

    await Promise.all(savePhotoPromises);
  }
}
