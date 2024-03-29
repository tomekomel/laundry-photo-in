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
import { Response } from 'express';

import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { GalleryService } from '../services/gallery.service';
import { GalleryNotFoundException } from '../exceptions/gallery-not-found.exception';
import { photoFileName } from '../../common/utils/file.utils';
import { PhotoService } from '../services/photo.service';
import { ThumbnailGenerator } from '../services/thumbnail.generator';

import MulterGoogleCloudStorage from 'multer-cloud-storage';
import * as path from 'path';

@Controller('photos')
export class PhotoController {
  private readonly uploadFolder;

  constructor(
    private readonly galleryService: GalleryService,
    private readonly photoService: PhotoService,
    private readonly thumbnailGenerator: ThumbnailGenerator,
  ) {
    this.uploadFolder = process.env.GOOGLE_UPLOAD_FOLDER;
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: new MulterGoogleCloudStorage({
        projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
        bucket: process.env.GOOGLE_STORAGE_BUCKET,
        keyFilename: path.join(
          __dirname,
          '..',
          '..',
          '..',
          'google-credentials.json',
        ),
        filename: photoFileName,
        destination: process.env.GOOGLE_UPLOAD_FOLDER,
        uniformBucketLevelAccess: true,
      }),
    }),
  )
  async uploadPhotos(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body('galleryId') galleryId: number,
    @Res() response: Response,
  ) {
    await this.thumbnailGenerator.generateThumbnails(photos, this.uploadFolder);
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
    const response = res.sendFile(photo, { root: process.env.GOOGLE_UPLOAD_FOLDER });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
