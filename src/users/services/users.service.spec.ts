import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '@users/services/users.service';
import { UsersRepository } from '@users/repository/users.repository';
import {
  mockUser,
  mockUserDto,
  mockUserRepository,
  mockUsers,
} from '@users/mocks/users.mock';
import { ROUTINE_UNIQUE, EMAIL_ERROR } from '@users/constants/user.constants';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GIVEN create method', () => {
    describe('WHEN is called with valid DTO', () => {
      it('THEN should call Users repository to create new user', () => {
        service.create(mockUserDto);
        expect(mockUserRepository.createbyDTO).toHaveBeenCalledWith(
          mockUserDto,
        );
      });
      it('THEN should returns User entity without password', async () => {
        expect(await service.create(mockUserDto)).toEqual({
          ...mockUser,
          uuid: expect.any(String),
          password: undefined,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          deletedAt: undefined,
        });
      });
    });
    describe('WHEN repository throws an error', () => {
      it('THEN should not create an user and throws the error', () => {
        mockUserRepository.createbyDTO.mockImplementationOnce(() => {
          throw new Error();
        });
        expect(service.create(mockUserDto)).rejects.toThrow(Error);
      });
    });
    describe('WHEN email already exists', () => {
      it('THEN should not create an user and throws conflict exception with email error', () => {
        mockUserRepository.createbyDTO.mockImplementationOnce(() => {
          throw { routine: ROUTINE_UNIQUE };
        });
        expect(service.create(mockUserDto)).rejects.toThrow(
          new ConflictException(EMAIL_ERROR),
        );
      });
    });
  });

  describe('GIVEN findAll method', () => {
    describe('WHEN it is called', () => {
      it('THEN should call Users repository to find all users', () => {
        service.findAll();
        expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
      });
      it('THEN should returns Users entities', async () => {
        expect(await service.findAll()).toEqual(mockUsers);
      });
    });
    describe('WHEN repository throws an error', async () => {
      it('THEN should not returns users', () => {
        mockUserRepository.find.mockImplementationOnce(() => {
          throw new Error();
        });
        expect(service.findAll()).rejects.toThrow(Error);
      });
    });
  });

  describe('GIVEN findOne method', () => {
    describe('WHEN it is called', () => {
      it('THEN should call Users repository to find one user', () => {
        const id = 'id';
        service.findOne(id);
        expect(mockUserRepository.findByUUID).toHaveBeenCalledWith(id);
      });
      it('THEN should returns User entity', async () => {
        const id = 'id';
        expect(await service.findOne(id)).toEqual({
          ...mockUser,
          uuid: id,
        });
      });
    });
    describe('WHEN repository throws an error', () => {
      it('THEN should not returns user', () => {
        mockUserRepository.findByUUID.mockImplementationOnce(() => {
          throw new Error();
        });
        expect(service.findOne('id')).rejects.toThrow(Error);
      });
    });
  });

  describe('GIVEN findByEmail method', () => {
    describe('WHEN it is called', () => {
      it('THEN should call Users repository to find one user', () => {
        const email = mockUser.email;
        service.findByEmail(email);
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      });
      it('THEN should returns User entity', async () => {
        const email = mockUser.email;
        expect(await service.findByEmail(email)).toEqual({
          ...mockUser,
          email,
        });
      });
    });
    describe('WHEN repository throws an error', () => {
      it('THEN should not returns user', () => {
        mockUserRepository.findByEmail.mockImplementationOnce(() => {
          throw new Error();
        });
        expect(service.findOne(mockUser.email)).rejects.toThrow(Error);
      });
    });
  });
});
