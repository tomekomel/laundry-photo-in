import {
  AfterInsert,
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
import { Country } from './country.entity';
import { Photo } from './photo.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

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

  @OneToMany(() => Photo, (photo) => photo.gallery, {
    cascade: ['update'],
  })
  @JoinTable()
  photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.gallery, { nullable: true })
  @JoinTable()
  comments: Comment[];

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'float', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'float', precision: 10, scale: 6 })
  longitude: number;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deleted: Date;

  @Column()
  hits: number;

  @AfterInsert()
  resetHits() {
    this.hits = 0;
  }
}
