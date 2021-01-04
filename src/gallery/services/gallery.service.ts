import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gallery } from '../entities/gallery.entity';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { GalleryDto } from '../dtos/gallery.dto';
import { Country } from '../entities/country.entity';
import { User } from '../../user/entities/user.entity';
import { EditGalleryDto } from '../dtos/edit-gallery.dto';
import { Photo } from '../entities/photo.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async findAll(countryId = 0, userId = 0): Promise<GalleryDto[]> {
    let whereConditions = {};

    if (countryId) {
      whereConditions = { country: { id: countryId } };
    }
    if (userId) {
      whereConditions = { ...whereConditions, user: { id: userId } };
    }

    return (
      await this.galleryRepository.find({
        relations: ['country', 'photos', 'user'],
        where: whereConditions,
        order: { created: 'DESC' },
      })
    ).map((gallery) => ({
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      country: gallery.country ? gallery.country.name : '',
      photo: gallery.photos.length ? gallery.photos[0].fileName : '',
      userName: gallery.user.name,
      created: gallery.created.toLocaleString('pl-PL'),
    }));
  }

  findOne(id: number): Promise<Gallery> {
    return this.galleryRepository.findOne(id, {
      relations: ['photos', 'user', 'country'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.galleryRepository.delete(id);
  }

  async save(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const gallery = new Gallery();
    const country = new Country();
    const user = new User();

    gallery.title = createGalleryDto.title;
    country.id = createGalleryDto.country;
    user.id = createGalleryDto.userId;
    gallery.user = user;
    gallery.country = country;
    gallery.description = createGalleryDto.description;

    return await this.galleryRepository.save(gallery);
  }

  async saveWithPhotos(editGalleryDto: EditGalleryDto) {
    const gallery = new Gallery();
    const country = new Country();

    gallery.title = editGalleryDto.title;
    country.id = +editGalleryDto.country;
    gallery.country = country;
    gallery.description = editGalleryDto.description;

    gallery.photos = editGalleryDto.photos.map((photoDto) => {
      const photo = new Photo();
      photo.id = +photoDto.photoId;
      photo.title = photoDto.title;
      photo.description = photoDto.description;
      return photo;
    });

    return await this.galleryRepository.save(gallery);
  }
}
