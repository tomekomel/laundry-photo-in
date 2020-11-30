import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gallery } from '../entities/gallery';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  findAll(): Promise<Gallery[]> {
    return this.galleryRepository.find();
  }

  findOne(id: string): Promise<Gallery> {
    return this.galleryRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.galleryRepository.delete(id);
  }
}
