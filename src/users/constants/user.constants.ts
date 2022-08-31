export const PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const PASSWORD_ERROR =
  'Password must contain at least 1 upper case latter, 1 lower case and 1 number or special character';
export const EMAIL_ERROR = 'Email is already in use';
export const ROUTINE_UNIQUE = '_bt_check_unique';
export const AVAILABLE_GENDERS = ['M', 'F', 'O'];
