import { Controller, Get, Param, Post, Render, Req } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CountryService } from '../services/country.service';
import { Request } from 'express';

@Controller('galleries')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly countryService: CountryService,
  ) {}

  @Post()
  saveGallery(@Req() request: Request) {
    this.galleryService.save(request.body);
  }

  @Get('create')
  @Render('create-gallery')
  async createGallery() {
    return { countries: await this.countryService.findAll() };
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
