import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
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
  async getGalleries(@Query('countryId') countryId: number) {
    return { galleries: await this.galleryService.findAll(countryId) };
  }

  @Get('my')
  @UseGuards(AuthenticatedGuard)
  @Render('my-galleries')
  async myGalleries(@Req() request) {
    return { galleries: await this.galleryService.findAll(0, request.user.id) };
  }

  @Get('/:id')
  @Render('gallery')
  async getGallery(@Param() id: number, @Request() request) {
    const gallery = await this.galleryService.findOne(id);
    await this.galleryService.incrementHits(
      gallery,
      request.user ? request.user.id : 0,
    );
    return {
      gallery,
      mapsApiKey: this.configService.get('MAPS_API_KEY'),
    };
  }

  @Get('/:id/edit')
  @UseGuards(AuthenticatedGuard)
  @Render('edit-gallery')
  async editGallery(@Param('id', ParseIntPipe) id: number) {
    return {
      gallery: await this.galleryService.findOne(id),
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
