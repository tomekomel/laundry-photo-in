import { NotFoundException } from '@nestjs/common';

export class GalleryNotFoundException extends NotFoundException {
  constructor() {
    super(`Gallery not found`);
  }
}
