import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Photo } from './photo.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Country, (country) => country.galleries, { nullable: true })
  country: Country;

  @OneToMany(() => Photo, (photo) => photo.gallery)
  photos: Photo[];

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deleted: Date;
}
