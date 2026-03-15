import { expect, test } from '../fixtures/registration.fixture';
import { buildUser } from '../test-data/user.factory';

test.describe('Registration', () => {
  test('should create a new user @smoke', async ({ page, registrationPage, newUser: user }) => {
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

  test('existing user', async ({ page, registrationPage }) => {
    const existingUser = buildUser();

    await registrationPage.registerUser(existingUser);
    await page.getByRole('link', { name: 'Log Out' }).click();
    await registrationPage.goto();
    await registrationPage.registerUser(existingUser);

    await expect(registrationPage.usernameError).toContainText(
      'This username already exists.',
    );
  });

  test('passwords do not match', async ({ registrationPage }) => {
    const userWithMismatchPassword = buildUser({ repeatedPassword: '1234' });

    await registrationPage.registerUser(userWithMismatchPassword);

    await expect(registrationPage.repeatedPasswordError).toContainText(
      'Passwords did not match.',
    );
  });
});
