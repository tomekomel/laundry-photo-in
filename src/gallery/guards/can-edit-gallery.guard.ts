import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gallery } from '../entities/gallery.entity';

@Injectable()
export class CanEditGalleryGuard implements CanActivate {
  constructor(private readonly galleryRepository: Repository<Gallery>) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    const gallery: Gallery = await this.galleryRepository
      .findOne(id, {
        relations: ['user'],
      })
      .catch((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      });

    return request.user.id === gallery.user.id;
  }
}
