import {
  Controller, Get,
  HttpStatus, Param,
  Post, Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('photos')
export class PhotoController {
  readonly uploadFolder = './upload';

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10))
  async uploadPhotos(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const filesResponse = {
        originalName: file.originalname,
        fileName: file.filename,
      };
      response.push(filesResponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Photos uploaded successfully!',
      data: response,
    };
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
