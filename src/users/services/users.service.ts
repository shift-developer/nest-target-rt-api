import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersRepository } from '@users/repository/users.repository';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { User } from '@users/entities/user.entity';
import { ROUTINE_UNIQUE, EMAIL_ERROR } from '@users/constants/user.constants';
import { compareSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly _usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this._usersRepository.createbyDTO(createUserDto);
      delete newUser.password;
      return newUser;
    } catch (e) {
      if (e.routine == ROUTINE_UNIQUE) throw new ConflictException(EMAIL_ERROR);
      else throw e;
    }
  }

  checkPassword(inputPassword: string, hashedUserPassword: string): boolean {
    return compareSync(inputPassword, hashedUserPassword);
  }

  async findAll(): Promise<User[]> {
    return this._usersRepository.find();
  }

  async findOne(uuid: string): Promise<User> {
    const user = await this._usersRepository.findByUUID(uuid);
    if (!user) throw new NotFoundException(`User id: ${uuid} not found.`);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._usersRepository.findByEmail(email);
  }
}
