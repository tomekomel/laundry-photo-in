import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Photo } from '../../gallery/entities/photo.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Photo)
  photo: Photo;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created!: Date;

  @DeleteDateColumn()
  deleted: Date;
}
