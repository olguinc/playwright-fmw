import { expect, test as base } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { buildUser, type UserRegistrationData } from '../test-data/user.factory';

type RegistrationFixtures = {
  registrationPage: RegistrationPage;
  newUser: UserRegistrationData;
};

export const test = base.extend<RegistrationFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await expect(page).toHaveURL(/\/register\.htm/);
    await registrationPage.isReady();
    await use(registrationPage);
  },

  newUser: async ({}, use) => {
    await use(buildUser());
  },
});

export { expect };
