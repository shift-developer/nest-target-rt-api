import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column('character varying', { length: 50 })
  firstname?: string;

  @Column('character varying', { length: 50 })
  lastname?: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}
