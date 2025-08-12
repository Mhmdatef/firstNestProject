import { IsEmail, IsString, MinLength } from 'class-validator';
import { AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @AfterInsert()
  logInsert() {
    console.log('Inserted user with email:', this.email);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with email:', this.email);
  }
  afterRemove() {
    console.log('Removed user with email:', this.email);
  }
}
