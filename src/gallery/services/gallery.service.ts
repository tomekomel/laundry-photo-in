import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gallery } from '../entities/gallery.entity';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { GalleryDto } from '../dtos/gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async findAll(): Promise<GalleryDto[]> {
    return (await this.galleryRepository.find()).map((gallery) => ({
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      created: gallery.created.toLocaleString('pl-PL'),
    }));
  }

  findOne(id: number): Promise<Gallery> {
    return this.galleryRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.galleryRepository.delete(id);
  }

  async save(createGalleryDto: CreateGalleryDto) {
    await this.galleryRepository.save(createGalleryDto);
  }
}
