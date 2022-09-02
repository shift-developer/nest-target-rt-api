import { faker } from '@faker-js/faker';
import IUser from '@users/interfaces/user.interface';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { Gender } from '@users/interfaces/user.interface';
import { AVAILABLE_GENDERS } from '@users/constants/user.constants';
import { randomUUID } from 'crypto';

const createMockUserDto = (userData?: IUser): CreateUserDto => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    gender: faker.helpers.arrayElement<Gender>(AVAILABLE_GENDERS),
    ...(userData || {}),
  };
};

const createMockUser = (
  mockUserDto: CreateUserDto,
  options?: { deleted: boolean },
) => {
  const user = new User(mockUserDto);
  user.uuid = randomUUID();
  user.createdAt = user.updatedAt = faker.date.past();
  if (options?.deleted !== false)
    user.deletedAt = faker.helpers.maybe<Date>(() => faker.date.past(), {
      probability: 0.1,
    });
  return user;
};

const createMockUsersArr = (numberOfUsers: number): User[] => {
  return Array.from({ length: numberOfUsers }, () =>
    createMockUser(createMockUserDto()),
  );
};

const mockUserDto: CreateUserDto = createMockUserDto();
const mockUser: User = createMockUser(mockUserDto, { deleted: false });

const mockUsers = [...createMockUsersArr(5), mockUser];
const mockUsersWithoutPassword = mockUsers.map((user) => ({
  ...user,
  password: undefined,
}));

const mockService = {
  create: jest.fn(async (dto: CreateUserDto) => {
    return { ...createMockUser(dto), password: undefined };
  }),
  checkPassword: jest.fn(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_inputPassword: string, _hashedUserPassword: string) => {
      return true;
    },
  ),
  findAll: jest.fn(() => {
    return mockUsersWithoutPassword;
  }),
  findOne: jest.fn((uuid: string) => {
    return { ...mockUser, uuid };
  }),
  findByEmail: jest.fn((email: string) => {
    return {
      ...mockUser,
      email,
    };
  }),
};

const mockUserRepository = {
  find: jest.fn(() => {
    return mockUsers;
  }),
  findByUUID: jest.fn((uuid: string) => {
    return { ...mockUsers[10], uuid };
  }),
  findByEmail: jest.fn((email: string) => {
    return {
      ...mockUsers[12],
      email,
    };
  }),
  createbyDTO: jest.fn((dto: CreateUserDto) => {
    return createMockUser(dto);
  }),
};

export {
  createMockUserDto,
  createMockUser,
  createMockUsersArr,
  mockUserDto,
  mockUser,
  mockUsers,
  mockUsersWithoutPassword,
  mockService,
  mockUserRepository,
};
