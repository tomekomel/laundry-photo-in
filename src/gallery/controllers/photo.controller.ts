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

@Controller('photos')
export class PhotoController {
  readonly uploadFolder = './upload';

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10))
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
    return { galleryId };
  }

  @Get(':photoName')
  getPhoto(@Param('photoName') photo, @Res() res) {
    const response = res.sendFile(photo, { root: this.uploadFolder });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
