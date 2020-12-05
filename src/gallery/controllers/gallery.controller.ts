import { Body, Controller, Post } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  createGallery(@Body() createGalleryDto: CreateGalleryDto) {
    this.galleryService.save(createGalleryDto);
  }
}
