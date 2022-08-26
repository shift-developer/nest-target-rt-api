import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { RequestWithUser } from 'src/users/types/requestWithUser';
import { JwtGuard } from '@auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  getUserInfoByReq(@Req() request: RequestWithUser) {
    return request.user;
  }
}
