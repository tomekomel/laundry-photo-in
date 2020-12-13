import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GalleryController } from './controllers/gallery.controller';
import { Gallery } from './entities/gallery.entity';
import { GalleryService } from './services/gallery.service';
import { Country } from './entities/country.entity';
import { CountryService } from './services/country.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery, Country])],
  controllers: [GalleryController],
  providers: [GalleryService, CountryService],
})
export class GalleryModule {}
