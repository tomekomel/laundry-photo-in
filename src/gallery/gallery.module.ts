import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryController } from './controllers/gallery.controller';
import { Gallery } from './entities/gallery.entity';
import { GalleryService } from './services/gallery.service';
import { Country } from './entities/country.entity';
import { CountryService } from './services/country.service';
import { PhotoController } from './controllers/photo.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './services/photo.service';
import { ThumbnailGenerator } from './services/thumbnail.generator';
import { GalleryApiController } from './controllers/gallery-api.controller';
import { CanEditGalleryGuard } from './guards/can-edit-gallery.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery, Country, Photo]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [GalleryController, PhotoController, GalleryApiController],
  providers: [
    GalleryService,
    CountryService,
    PhotoService,
    ThumbnailGenerator,
    CanEditGalleryGuard,
  ],
})
export class GalleryModule {}
