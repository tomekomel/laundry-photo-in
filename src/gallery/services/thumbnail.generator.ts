const Storage = require('@google-cloud/storage');

import { Injectable, Logger } from '@nestjs/common';
import * as jimp from 'jimp';
import { join } from 'path';
import { MIME_JPEG } from 'jimp';

@Injectable()
export class ThumbnailGenerator {
  private readonly sizes = ['100x100', '300x300', '600x600', '1200x1200'];
  private readonly availableExtensions = ['jpg', 'jpeg', 'png'];
  private readonly googleStorage;

  constructor() {
    this.googleStorage = new Storage({
      projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
      keyFilename: join(__dirname, '..', '..', '..', 'google-credentials.json'),
    });
    this.googleStorage.bucket(process.env.GOOGLE_STORAGE_BUCKET);
  }

  async generateThumbnails(
    photos: Express.Multer.File[],
    uploadFolder: string,
  ) {
    const generateThumbnailsPromises = [];
    this.sizes.forEach((size) => {
      photos.forEach((photo) => {
        generateThumbnailsPromises.push(
          this.generateThumbnail(photo, size, uploadFolder),
        );
      });
    });

    await Promise.all(generateThumbnailsPromises);
  }

  async generateThumbnail(
    photo: Express.Multer.File,
    size: string,
    uploadFolder: string,
  ) {
    const [singleSize] = size.split('x');
    console.log(' Storage ', this.googleStorage);
    try {
      const thumbPath = `${uploadFolder}/${size}/${photo.filename}`;
      const options = {
        destination: thumbPath,
        preconditionOpts: { ifGenerationMatch: 0 },
      };
      console.log('Photo ', photo);
      const image = await jimp.read(photo.path);
      await image.resize(+singleSize, jimp.AUTO);

      const imageBuffer = await image.getBufferAsync(MIME_JPEG);
      await this.googleStorage.file(thumbPath).save(imageBuffer);
      console.log('File correctly uploaded: ', thumbPath);
    } catch (error) {
      Logger.error(error);
    }
  }

  private checkExtensionAvailability(photo: Express.Multer.File): boolean {
    const [, extension] = photo.mimetype.split('/');
    return this.availableExtensions.includes(extension);
  }
}
