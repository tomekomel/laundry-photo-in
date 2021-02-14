import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gallery } from './gallery.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fileName: string;

  @Column()
  alt: string;

  @ManyToOne(() => Gallery, (gallery) => gallery.photos, { nullable: false })
  gallery: Gallery;

  @OneToMany(() => Favorite, (favorite) => favorite.photo, { nullable: true })
  @JoinTable()
  favorites: Favorite[];

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deleted: Date;
}
