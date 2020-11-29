import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [GalleryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
