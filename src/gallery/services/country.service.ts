import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from '../entities/country.entity';
import { CountryDto } from '../dtos/country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly galleryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<CountryDto[]> {
    return (await this.galleryRepository.find()).map((country) => ({
      id: country.id,
      code: country.code,
      name: country.name,
    }));
  }
}
