import { Module } from '@nestjs/common';
import { GalleryController } from './controllers/gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery])],
  controllers: [GalleryController],
  providers: [],
})
export class GalleryModule {}
