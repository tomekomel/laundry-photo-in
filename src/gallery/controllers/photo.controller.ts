import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { GalleryService } from '../services/gallery.service';
import { GalleryNotFoundException } from '../exceptions/gallery-not-found.exception';
import { photoFileName } from '../../common/utils/file.utils';
import { PhotoService } from '../services/photo.service';
import { ThumbnailGenerator } from '../services/thumbnail.generator';

const uploadFolder = './public/uploads';

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly photoService: PhotoService,
    private readonly thumbnailGenerator: ThumbnailGenerator
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: uploadFolder,
        filename: photoFileName,
      }),
    }),
  )
  async uploadPhotos(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body('galleryId') galleryId: number,
    @Res() response: Response,
  ) {
    this.thumbnailGenerator.generateThumbnails(photos);
    await this.photoService.saveUploadedPhotos(photos, galleryId);
    response.redirect(`/galleries/${galleryId}/edit`);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('add')
  @Render('add-photos')
  async addPhotos(@Query('galleryId') galleryId: number) {
    const gallery = await this.galleryService.findOneById(galleryId);

    if (!galleryId || !gallery) {
      throw new GalleryNotFoundException();
    }

    return { galleryId, galleryName: gallery.title };
  }

  @Get(':photoName')
  getPhoto(@Param('photoName') photo, @Res() res) {
    const response = res.sendFile(photo, { root: uploadFolder });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
