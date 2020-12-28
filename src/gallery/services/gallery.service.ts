import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gallery } from '../entities/gallery.entity';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { GalleryDto } from '../dtos/gallery.dto';
import { Country } from '../entities/country.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async findAll(): Promise<GalleryDto[]> {
    return (
      await this.galleryRepository.find({
        relations: ['country', 'photos'],
        order: { created: 'DESC' },
      })
    ).map((gallery) => ({
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      country: gallery.country ? gallery.country.name : '',
      photo: gallery.photos.length ? gallery.photos[0].fileName : '',
      created: gallery.created.toLocaleString('pl-PL'),
    }));
  }

  findOne(id: number): Promise<Gallery> {
    return this.galleryRepository.findOne(id, { relations: ['photos'] });
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
}
