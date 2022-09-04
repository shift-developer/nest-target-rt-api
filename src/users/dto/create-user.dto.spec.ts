import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { PASSWORD_ERROR } from '@users/constants/user.constants';

const userInfo = {
  firstName: 'firstname',
  lastName: 'lastName',
  password: 'Password123',
  email: 'user@example.com',
  gender: 'M',
};

const validateUserInfo = async (
  userInfoInput: any,
): Promise<ValidationError[]> => {
  const createUserDto = plainToInstance(CreateUserDto, userInfoInput);
  return validate(createUserDto);
};

describe('CreateUserDto class', () => {
  describe('GIVEN all input properties as expected', () => {
    it('THEN should no have errors', async () => {
      expect((await validateUserInfo(userInfo)).length).toBe(0);
    });
  });

  describe('GIVEN some input properties not as expected', () => {
    it('THEN should throw more than one error', async () => {
      expect(
        (
          await validateUserInfo({
            ...userInfo,
            firstName: '',
            lastName: '',
            password: null,
          })
        ).length,
      ).toBeGreaterThan(1);
    });
  });

  describe('GIVEN email property', () => {
    it('WHEN is not valid email THEN should throw error', async () => {
      expect((await validateUserInfo({ ...userInfo, email: 1 })).length).toBe(
        1,
      );

      expect((await validateUserInfo({ ...userInfo, email: '' })).length).toBe(
        1,
      );

      expect(
        (
          await validateUserInfo({
            ...userInfo,
            email: 'emailbadexample@@.asd',
          })
        ).length,
      ).toBe(1);

      expect(
        (await validateUserInfo({ ...userInfo, email: null })).length,
      ).toBe(1);

      expect(
        (await validateUserInfo({ ...userInfo, email: undefined })).length,
      ).toBe(1);
    });
  });

  describe('GIVEN password property', () => {
    it('WHEN is empty or invalid type THEN should throw error', async () => {
      expect(
        (await validateUserInfo({ ...userInfo, password: '' })).length,
      ).toBe(1);

      expect(
        (await validateUserInfo({ ...userInfo, password: 1 })).length,
      ).toBe(1);

      expect(
        (await validateUserInfo({ ...userInfo, password: undefined })).length,
      ).toBe(1);

      expect(
        (await validateUserInfo({ ...userInfo, password: null })).length,
      ).toBe(1);
    });

    describe('WHEN password not contain at least 1 upper case latter, 1 lower case and 1 number or special character', () => {
      it('THEN should throw error with correct message', async () => {
        expect(
          (await validateUserInfo({ ...userInfo, password: null })).length,
        ).toBe(1);

        expect(
          (
            await validateUserInfo({
              ...userInfo,
              password: null,
            })
          )[0].constraints.matches,
        ).toBe(PASSWORD_ERROR);
      });
    });

    it('WHEN password has less than 6 characters or more than 50 THEN should throw error', async () => {
      expect(
        (await validateUserInfo({ ...userInfo, password: 'Pa123' })).length,
      ).toBe(1);

      expect(
        (
          await validateUserInfo({
            ...userInfo,
            password: 'Password123' + Array(50).fill('a').join(''),
          })
        ).length,
      ).toBe(1);
    });
  });

  describe('GIVEN firstName or lastName property', () => {
    it('WHEN is empty or invalid type THEN should throw error', async () => {
      expect(
        (await validateUserInfo({ ...userInfo, firstName: '', lastName: '' }))
          .length,
      ).toBe(2);

      expect(
        (await validateUserInfo({ ...userInfo, firstName: 1, lastName: 2 }))
          .length,
      ).toBe(2);

      expect(
        (
          await validateUserInfo({
            ...userInfo,
            firstName: undefined,
            lastName: undefined,
          })
        ).length,
      ).toBe(2);

      expect(
        (
          await validateUserInfo({
            ...userInfo,
            firstName: null,
            lastName: null,
          })
        ).length,
      ).toBe(2);
    });

    it('WHEN firstName or lastName not contain at least 2 characters or contains more than 50 characters THEN should throw error', async () => {
      expect(
        (
          await validateUserInfo({
            ...userInfo,
            firstName: 'A',
            lastName: 'A',
          })
        ).length,
      ).toBe(2);

      expect(
        (
          await validateUserInfo({
            ...userInfo,
            firstName: Array(51).fill('a').join(''),
            lastName: Array(51).fill('a').join(''),
          })
        ).length,
      ).toBe(2);
    });
  });

  describe('GIVEN gender property', () => {
    it('WHEN is not valid gender type THEN should throw error', async () => {
      expect((await validateUserInfo({ ...userInfo, gender: 1 })).length).toBe(
        1,
      );

      expect((await validateUserInfo({ ...userInfo, gender: '' })).length).toBe(
        1,
      );

      expect(
        (await validateUserInfo({ ...userInfo, gender: null })).length,
      ).toBe(1);

      expect(
        (await validateUserInfo({ ...userInfo, gender: undefined })).length,
      ).toBe(1);
    });

    it('WHEN is not valid gender available value THEN should throw error', async () => {
      expect(
        (await validateUserInfo({ ...userInfo, gender: 'P' })).length,
      ).toBe(1);
    });
  });
});
