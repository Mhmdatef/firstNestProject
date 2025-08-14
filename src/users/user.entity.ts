import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @AfterInsert()
  logInsert() {
    console.log('Inserted user with email:', this.email);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with email:', this.email);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed user with email:', this.email);
  }
}
