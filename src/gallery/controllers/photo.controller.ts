import {
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
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { GalleryService } from '../services/gallery.service';
import { GalleryNotFoundException } from '../exceptions/gallery-not-found.exception';
import { diskStorage } from 'multer';
import { photoFileName } from '../../common/utils/file.utils';

const uploadFolder = './upload';

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly galleryService: GalleryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10, {
    storage: diskStorage({
      destination: uploadFolder,
      filename: photoFileName,
    })
  }))
  async uploadPhotos(@UploadedFiles() photos) {
    const response = [];
    photos.forEach((photo) => {
      const photoResponse = {
        originalName: photo.originalname,
        fileName: photo.filename,
      };
      response.push(photoResponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Photos uploaded successfully!',
      data: response,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('add')
  @Render('add-photos')
  async addPhotos(@Query('galleryId') galleryId: number) {
    const gallery = await this.galleryService.findOne(galleryId);

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
