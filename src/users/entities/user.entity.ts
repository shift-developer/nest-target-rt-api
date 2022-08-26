import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '@users/interfaces/user.interface';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column('character varying', { length: 50 })
  firstName: string;

  @Column('character varying', { length: 50 })
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column('char', { length: 1 })
  gender: Gender;
}
