import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
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
  async createGallery(@Req() request) {
    return {
      countries: await this.countryService.findAll(),
      userId: request.user.id,
    };
  }

  @Get()
  @Render('galleries')
  async getGalleries(@Query('countryId') countryId: number) {
    return { galleries: await this.galleryService.findAll(countryId) };
  }

  @Get('/:id')
  @Render('gallery')
  async getGallery(@Param() id: number) {
    return { gallery: await this.galleryService.findOne(id) };
  }
}
