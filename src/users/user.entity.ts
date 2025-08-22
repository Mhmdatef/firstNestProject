import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
