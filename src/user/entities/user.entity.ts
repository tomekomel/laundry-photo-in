import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deleted: Date;

  @Column({ length: 36 })
  uuid?: string;

  @Column({ default: false })
  active: boolean;

  @BeforeInsert()
  async generatePasswordHash(): Promise<void> {
    this.password = await bcrypt.hashSync(
      this.password,
      bcrypt.genSaltSync(10),
    );
  }

  @BeforeInsert()
  inactivate() {
    this.uuid = uuid();
    this.active = false;
  }

  activate() {
    this.uuid = null;
    this.active = true;
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}
