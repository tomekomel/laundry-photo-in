import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
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

  async findOneById(id: number): Promise<Gallery> {
    return await this.galleryRepository.findOne(id, {
      relations: ['photos', 'user', 'country', 'comments', 'comments.user'],
    });
  }

  async findOneBySlug(slug: string, userId: number): Promise<Gallery> {
    const query = await this.galleryRepository
      .createQueryBuilder('gallery')
      .leftJoinAndSelect('gallery.photos', 'photo')
      .leftJoinAndSelect('gallery.user', 'user')
      .leftJoinAndSelect('gallery.country', 'country')
      .leftJoinAndSelect('gallery.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentingUsers')
      .where('gallery.slug = :slug', { slug });

    if (userId) {
      query
        .leftJoinAndSelect('photo.favorites', 'favorite')
        .leftJoinAndSelect('favorite.user', 'favoriteOwner')
        .andWhere(
          new Brackets((qb) => {
            qb.where('favoriteOwner.id = :userId', { userId }).orWhere(
              'favoriteOwner.id IS NULL',
            );
          }),
        );
    }

    return query.getOne();
  }

  async findBySlug(slug: string): Promise<Gallery[]> {
    return await this.galleryRepository.find({ where: { slug } });
  }

  async delete(id: string): Promise<void> {
    await this.galleryRepository.delete(id);
  }

  private async prepareSlug(title: string): Promise<string> {
    const slug = slugify(title, { lower: true });
    const galleriesWithSlug = await this.findBySlug(slug);

    return galleriesWithSlug.length
      ? `${slug}-${galleriesWithSlug.length + 1}`
      : slug;
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
    const gallery = await this.findOneById(galleryId);
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
    if (!gallery || gallery.user.id === userId) {
      return;
    }
    gallery.hits++;
    await this.galleryRepository.save(gallery);
  }
}
