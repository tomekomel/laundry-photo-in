import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { default as slugify } from 'slugify';

import { Gallery } from '../entities/gallery.entity';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { GalleryListDto } from '../dtos/gallery-list.dto';
import { Country } from '../entities/country.entity';
import { User } from '../../user/entities/user.entity';
import { EditGalleryDto } from '../dtos/edit-gallery.dto';
import { mapToGalleryListDto, mapToPhoto } from '../mappers/mappers';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async findAll(countryId = 0, userId = 0): Promise<GalleryListDto[]> {
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
    ).map((gallery) => mapToGalleryListDto(gallery));
  }

  async findOne(id: number): Promise<Gallery> {
    return await this.galleryRepository.findOne(id, {
      relations: ['photos', 'user', 'country', 'comments', 'comments.user'],
    });
  }

  async findBySlug(slug: string): Promise<Gallery[]> {
    return await this.galleryRepository.find({ where: { slug } });
  }

  async delete(id: string): Promise<void> {
    await this.galleryRepository.delete(id);
  }

  private async prepareSlug(title: string): Promise<string> {
    let slug = slugify(title, { lower: true });
    const galleriesWithSlug = await this.findBySlug(slug);

    if (galleriesWithSlug.length) {
      slug = `${slug}-${galleriesWithSlug.length + 1}`;
    }
    return slug;
  }

  async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const gallery = new Gallery();
    const country = new Country();
    const user = new User();

    gallery.title = createGalleryDto.title;
    country.id = createGalleryDto.country;
    user.id = createGalleryDto.userId;
    gallery.user = user;
    gallery.country = country;
    gallery.description = createGalleryDto.description;
    gallery.latitude = createGalleryDto.latitude;
    gallery.longitude = createGalleryDto.longitude;
    gallery.slug = await this.prepareSlug(gallery.title);

    return await this.galleryRepository.save(gallery);
  }

  async updateGallery(galleryId: number, editGalleryDto: EditGalleryDto) {
    const gallery = await this.findOne(galleryId);
    const country = new Country();

    if (gallery.title !== editGalleryDto.title) {
      gallery.slug = await this.prepareSlug(editGalleryDto.title);
    }

    gallery.title = editGalleryDto.title;
    country.id = +editGalleryDto.country;
    gallery.country = country;
    gallery.description = editGalleryDto.description;
    gallery.latitude = editGalleryDto.latitude;
    gallery.longitude = editGalleryDto.longitude;

    if (editGalleryDto.photos) {
      gallery.photos = editGalleryDto.photos.map((photoDto) =>
        mapToPhoto(photoDto),
      );
    }

    return await this.galleryRepository.save(gallery);
  }

  async incrementHits(gallery: Gallery, userId: number) {
    if (gallery.user.id === userId) {
      return;
    }
    gallery.hits++;
    await this.galleryRepository.save(gallery);
  }
}
