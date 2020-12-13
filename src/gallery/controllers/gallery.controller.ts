import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';

@Controller('galleries')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  saveGallery(@Body() createGalleryDto: CreateGalleryDto) {
    this.galleryService.save(createGalleryDto);
  }

  @Get('create')
  @Render('create-gallery')
  async createGallery() {
    return { galleries: await this.galleryService.findAll() };
  }

  @Get()
  @Render('galleries')
  async getGalleries() {
    return { galleries: await this.galleryService.findAll() };
  }

  @Get('/:id')
  getGallery(@Param() id: number) {
    return this.galleryService.findOne(id);
  }
}
