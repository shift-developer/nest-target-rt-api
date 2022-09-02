import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@users/controllers/users.controller';
import { UsersService } from '@users/services/users.service';
import {
  mockService,
  mockUser,
  mockUserDto,
  mockUsersWithoutPassword,
} from '@users/mocks/users.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GIVEN create method', () => {
    describe('WHEN is called with valid DTO', () => {
      it('THEN should call User Service with DTO to create new user', () => {
        controller.create(mockUserDto);
        expect(mockService.create).toHaveBeenCalledWith(mockUserDto);
      });

      it('THEN should create a user', async () => {
        expect(await controller.create(mockUserDto)).toEqual({
          ...mockUser,
          uuid: expect.any(String),
          password: undefined,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          deletedAt: undefined,
        });
      });
    });
  });

  describe('GIVEN getAll method', () => {
    describe('WHEN it is called', () => {
      it('THEN should get all users', async () => {
        expect(await controller.getAll()).toEqual(mockUsersWithoutPassword);
      });
    });
  });

  describe('GIVEN getOne method', () => {
    describe('WHEN it is called', () => {
      it('THEN should get one user', async () => {
        const uuid = 'uuid';
        expect(await controller.getOne(uuid)).toEqual({
          ...mockUser,
          uuid,
        });
      });
    });
  });
});
