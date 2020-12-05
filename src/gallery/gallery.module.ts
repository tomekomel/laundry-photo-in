import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GalleryController } from './controllers/gallery.controller';
import { Gallery } from './entities/gallery.entity';
import { GalleryService } from './services/gallery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
