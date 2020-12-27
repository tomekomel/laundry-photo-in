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

@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery, Country, Photo]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [GalleryController, PhotoController],
  providers: [GalleryService, CountryService],
})
export class GalleryModule {}
