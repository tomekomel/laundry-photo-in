import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from './gallery.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Gallery, (gallery) => gallery.country, { nullable: true })
  galleries: Gallery[];
}
