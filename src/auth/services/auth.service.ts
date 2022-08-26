import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDTO } from '@auth/dto/sign-up.dto';
import { SignInDTO } from '@auth/dto/sign-in.dto';
import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/services/users.service';
import { JwtPayload } from '@auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '@auth/interfaces/access-token.interface';
import { FullJwt } from '@auth/interfaces/jwt-full.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDTO): Promise<User> {
    return this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDTO): Promise<AccessToken> {
    const user = await this.usersService.findByEmail(signInDto.email);
    const areUserAndPasswordValidated =
      !!user &&
      this.usersService.checkPassword(signInDto.password, user.password);

    if (areUserAndPasswordValidated === false)
      throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = {
      id: user.id,
    };
    const accessToken = this.jwtService.sign({ data: payload });
    return { accessToken };
  }

  async findUserByTokenPayload(jwt: FullJwt): Promise<User> {
    try {
      const user = await this.usersService.findOne(jwt.data.id);
      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
