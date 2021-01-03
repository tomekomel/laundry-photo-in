import { readFile } from 'fs';
import * as sharp from 'sharp';
import { promisify } from 'util';
import { Injectable, Logger } from '@nestjs/common';

const readFileAsync = promisify(readFile);

@Injectable()
export class ThumbnailGenerator {
  readonly sizes = ['100x100', '300x300', '600x600', '1200x1200'];
  readonly availableExtensions = ['jpg', 'jpeg', 'png'];
  readonly folderPath = `./public/uploads`;

  generateThumbnails(photos: Express.Multer.File[]) {
    this.sizes.forEach((size) => {
      photos.forEach((photo) => this.generateThumbnail(photo, size));
    });
  }

  generateThumbnail(photo: Express.Multer.File, size: string) {
    const [singleSize] = size.split('x');
    readFileAsync(photo.path)
      .then((buffer) => {
        return sharp(buffer)
          .resize(+singleSize)
          .jpeg({ quality: 95 })
          .toFile(`${this.folderPath}/${size}/${photo.filename}`);
      })
      .then((result) => Logger.log(result))
      .catch((error) => Logger.error(error));
  }

  private checkExtensionAvailability(photo: Express.Multer.File): boolean {
    const [, extension] = photo.mimetype.split('/');
    return this.availableExtensions.includes(extension);
  }
}
