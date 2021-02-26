import { Controller, Get, Request } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { GalleryListDto } from '../dtos/gallery-list.dto';

@Controller('api/galleries')
export class GalleryApiController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async getGalleries(@Request() request): Promise<GalleryListDto[]> {
    const countryId = request.query.countrId || 0;
    return (
      await this.galleryService.paginate(countryId, 0, {
        limit: 300,
        page: 1,
      })
    ).results;
  }
}
