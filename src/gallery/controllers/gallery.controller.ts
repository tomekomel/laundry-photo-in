import { Controller, Get, Param, Post, Render, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CountryService } from '../services/country.service';
import { Request, Response } from 'express';
import { AuthExceptionFilter } from '../../common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';

@UseFilters(AuthExceptionFilter)
@Controller('galleries')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly countryService: CountryService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async saveGallery(@Req() request: Request, @Res() response: Response) {
    const gallery = await this.galleryService.save(request.body);
    response.redirect(`/photos/add?galleryId=${gallery.id}`);
  }

  @UseGuards(AuthenticatedGuard)
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
