import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { AbstractEntity } from '@common/entities/abstract.entity';
import IUser, { Gender } from '@users/interfaces/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';

@Entity({ name: 'users' })
@Index('email_index_unique', ['email'], { unique: true })
export class User extends AbstractEntity {
  @Column()
  email: string;

  @Column('character varying', { length: 50 })
  firstName: string;

  @Column('character varying', { length: 50 })
  lastName: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  setPassword() {
    this.password = hashSync(this.password, genSaltSync());
  }

  @Column('char', { length: 1 })
  gender: Gender;

  constructor(user?: IUser) {
    super();
    if (user) {
      this.email = user.email || '';
      this.firstName = user.firstName || '';
      this.lastName = user.lastName || '';
      this.password = user.password || '';
      this.gender = user.gender || 'O';
    }
  }
}
