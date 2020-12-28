import { readFile } from 'fs';
import * as sharp from 'sharp';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

const readFileAsync = promisify(readFile);

@Injectable()
export class ThumbnailGenerator {
  readonly sizes = ['100x100', '300x300', '1200x1200'];
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
          .toFile(`${this.folderPath}/${size}/${photo.filename}`);
      })
      .then(console.log)
      .catch(console.error);
  }

  private checkExtensionAvailability(photo: Express.Multer.File): boolean {
    const [, extension] = photo.mimetype.split('/');
    return this.availableExtensions.includes(extension);
  }
}
