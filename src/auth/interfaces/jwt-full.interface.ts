import { JwtPayload } from '@auth/interfaces/jwt-payload.interface';

export interface FullJwt {
  data: JwtPayload;
  iat: number;
  exp: number;
}
