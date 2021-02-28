import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request as RequestObject, Response } from 'express';

import { GalleryService } from '../services/gallery.service';
import { CountryService } from '../services/country.service';
import { AuthExceptionFilter } from '../../common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { EditGalleryDto } from '../dtos/edit-gallery.dto';
import { mapToGalleryDto } from '../mappers/mappers';
import { CanEditGalleryGuard } from '../guards/can-edit-gallery.guard';

@UseFilters(AuthExceptionFilter)
@Controller('galleries')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async saveGallery(@Req() request: RequestObject, @Res() response: Response) {
    const gallery = await this.galleryService.create(request.body);
    response.redirect(`/photos/add?galleryId=${gallery.id}`);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('create')
  @Render('create-gallery')
  async createGallery(@Req() request) {
    return {
      countries: await this.countryService.findAll(),
      userId: request.user.id,
      mapsApiKey: this.configService.get('MAPS_API_KEY'),
    };
  }

  @Get()
  @Render('galleries')
  async getGalleries(@Request() request) {
    const countryId = request.query.countrId || 0;
    return await this.galleryService.paginate(countryId, 0, {
      limit: this.configService.get('GALLERIES_ON_PAGE'),
      page: request.query.hasOwnProperty('page') ? request.query.page : 1,
    });
  }

  @Get('my')
  @UseGuards(AuthenticatedGuard)
  @Render('my-galleries')
  async myGalleries(@Req() request) {
    return await this.galleryService.paginate(0, request.user.id, {
      limit: this.configService.get('MY_GALLERIES_ON_PAGE'),
      page: request.query.hasOwnProperty('page') ? request.query.page : 1,
    });
  }

  @Get('/map')
  @Render('galleries-map')
  async getGalleriesMap(@Request() request) {
    const countryId = request.query.countrId || 0;

    return {
      galleries: JSON.stringify(
        (
          await this.galleryService.paginate(countryId, 0, {
            limit: 300,
            page: 1,
          })
        ).results,
      ),
      mapsApiKey: this.configService.get('MAPS_API_KEY'),
      domain: this.configService.get('DOMAIN'),
    };
  }

  @Get('/:slug')
  async getGallery(
    @Param('slug') slug: string,
    @Request() request,
    @Res() response: Response,
  ) {
    const userId = request.user ? request.user.id : 0;
    const gallery = await this.galleryService.findOneBySlug(slug, userId);
    await this.galleryService.incrementHits(gallery, userId);
    const galleryDto = mapToGalleryDto(gallery, userId);

    response.render('gallery', {
      gallery: galleryDto,
      userId,
      mapsApiKey: this.configService.get('MAPS_API_KEY'),
      domain: this.configService.get('DOMAIN'),
      layout: 'main-with-og-tags',
      title: galleryDto.title + ' | ' + this.configService.get('APP_NAME'),
    });
  }

  @Get('/:id/edit')
  @UseGuards(AuthenticatedGuard)
  @UseGuards(CanEditGalleryGuard)
  @Render('edit-gallery')
  async editGallery(@Param('id', ParseIntPipe) id: number) {
    return {
      gallery: await this.galleryService.findOneById(id),
      countries: await this.countryService.findAll(),
      mapsApiKey: this.configService.get('MAPS_API_KEY'),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/:id')
  async saveGalleryWithPhotos(
    @Param('id', ParseIntPipe) id: number,
    @Body() editGalleryDto: EditGalleryDto,
    @Res() response: Response,
  ) {
    await this.galleryService.updateGallery(id, editGalleryDto);
    response.redirect(`/galleries/my`);
  }
}
