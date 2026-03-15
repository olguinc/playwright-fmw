import { randomUUID } from 'crypto';

const baseUser = {
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

export function uniqueUsername(prefix = 'user') {
  return `${prefix}_${randomUUID().replace(/-/g, '').slice(0, 12)}`;
}

export function buildUser(overrides = {}) {
  return {
    ...baseUser,
    username: uniqueUsername(),
    repeatedPassword: baseUser.password,
    ...overrides,
  };
}
