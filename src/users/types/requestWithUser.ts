import { User as UserEntity } from '@users/entities/user.entity';

export type RequestWithUser = Request & { user: UserEntity };
