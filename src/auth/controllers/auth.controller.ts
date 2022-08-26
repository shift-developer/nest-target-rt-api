import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { SignUpDTO } from '@auth/dto/sign-up.dto';
import { SignInDTO } from '@auth/dto/sign-in.dto';
import { User } from '@users/entities/user.entity';
import { AccessToken } from '@auth/interfaces/access-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDTO): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  async signin(@Body() signInDto: SignInDTO): Promise<AccessToken> {
    return this.authService.signIn(signInDto);
  }
}
