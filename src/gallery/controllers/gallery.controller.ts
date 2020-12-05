import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { GalleryDto } from '../dtos/gallery.dto';

@Controller('galleries')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  createGallery(@Body() createGalleryDto: CreateGalleryDto) {
    this.galleryService.save(createGalleryDto);
  }

  @Get()
  getGalleries() {
    return this.galleryService.findAll();
  }

  @Get('/:id')
  getGallery(@Param() id: number) {
    return this.galleryService.findOne(id);
  }
}
