import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          `${info?.name || 'Error'}: ${info?.message || ''}`,
        )
      );
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
