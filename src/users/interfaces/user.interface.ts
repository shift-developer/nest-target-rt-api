export type Gender = 'M' | 'F' | 'O';

export default interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  password?: string;
}
