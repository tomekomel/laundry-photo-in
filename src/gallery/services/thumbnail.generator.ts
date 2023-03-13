import { Injectable, Logger } from '@nestjs/common';
import * as jimp from 'jimp';

@Injectable()
export class ThumbnailGenerator {
  readonly sizes = ['100x100', '300x300', '600x600', '1200x1200'];
  readonly availableExtensions = ['jpg', 'jpeg', 'png'];
  readonly folderPath = `./public/uploads`;

  async generateThumbnails(photos: Express.Multer.File[]) {
    const generateThumbnailsPromises = [];
    this.sizes.forEach((size) => {
      photos.forEach((photo) => {
        generateThumbnailsPromises.push(this.generateThumbnail(photo, size));
      });
    });

    await Promise.all(generateThumbnailsPromises);
  }

  async generateThumbnail(photo: Express.Multer.File, size: string) {
    const [singleSize] = size.split('x');
    try {
      const thumbPath = `${this.folderPath}/${size}/${photo.filename}`;
      const image = await jimp.read(photo.path);
      await image.resize(+singleSize, jimp.AUTO);
      await image.writeAsync(thumbPath);
      Logger.log('File correctly uploaded: ', thumbPath);
    } catch (error) {
      Logger.error(error);
    }
  }

  private checkExtensionAvailability(photo: Express.Multer.File): boolean {
    const [, extension] = photo.mimetype.split('/');
    return this.availableExtensions.includes(extension);
  }
}
