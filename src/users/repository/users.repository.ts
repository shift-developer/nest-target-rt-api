import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from '@users/dto/create-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByUUID(uuid: string): Promise<User | null> {
    return this.findOneBy({ uuid });
  }

  /**
   * Retrieves full User entity (password included) by email. If entity was not found in the database - returns null.
   * @param {string} email - User Email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      where: { email },
      select: this.getUserColumns(),
    });
  }

  async createbyDTO(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.create(createUserDto);
    const user = await this.save(newUser);
    return user;
  }

  private getUserColumns(): (keyof User)[] {
    return this.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof User)[];
  }
}
