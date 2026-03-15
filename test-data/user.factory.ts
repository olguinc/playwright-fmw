import { randomUUID } from 'crypto';

export type UserRegistrationData = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  username: string;
  password: string;
  repeatedPassword: string;
};

const baseUser: Omit<UserRegistrationData, 'username' | 'repeatedPassword'> = {
  firstName: 'John',
  lastName: 'Doe',
  street: '742 Evergreen Terrace',
  city: 'Springfield',
  state: 'CA',
  zipCode: '90011',
  phoneNumber: '+14185438090',
  ssn: '123456789',
  password: 'pass',
};

export function uniqueUsername(prefix = 'user'): string {
  return `${prefix}_${randomUUID().replace(/-/g, '').slice(0, 12)}`;
}

export function buildUser(
  overrides: Partial<UserRegistrationData> = {},
): UserRegistrationData {
  return {
    ...baseUser,
    username: uniqueUsername(),
    repeatedPassword: baseUser.password,
    ...overrides,
  };
}
