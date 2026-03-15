import { expect, test } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { buildUser } from '../test-data/user.factory';

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await expect(page).toHaveURL(/\/register\.htm/);
    await registrationPage.isReady();
  });

  test('should create a new user', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const user = buildUser();
    await registrationPage.registerUser(user);

    await expect(
      page.getByText(
        'Your account was created successfully. You are now logged in.',
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: `Welcome ${user.username}` }),
    ).toBeVisible();
    await page.getByRole('link', { name: 'Log Out' }).click();
  });

  test('existing user', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const existingUser = buildUser();

    await registrationPage.registerUser(existingUser);
    await page.getByRole('link', { name: 'Log Out' }).click();
    await registrationPage.goto();
    await registrationPage.registerUser(existingUser);

    await expect(registrationPage.usernameError).toContainText(
      'This username already exists.',
    );
  });

  test('passwords do not match', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const userWithMismatchPassword = buildUser({ repeatedPassword: '1234' });

    await registrationPage.registerUser(userWithMismatchPassword);

    await expect(registrationPage.repeatedPasswordError).toContainText(
      'Passwords did not match.',
    );
  });
});
