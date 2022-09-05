import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from '@users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}
  @Get()
  async getAll(): Promise<User[]> {
    return this._usersService.findAll();
  }

  @Get(':uuid')
  async getOne(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
    return this._usersService.findOne(uuid);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._usersService.create(createUserDto);
  }
}
