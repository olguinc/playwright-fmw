// @ts-check
import { test, expect } from '@playwright/test';
// @ts-ignore
let testUser = {
  user: 'user',
  pass: 'pass',
};

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the registration page before each test.
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Register' }).click();
    const url = page.url();
    expect(
      url.startsWith('https://parabank.parasoft.com/parabank/register.htm'),
    ).toBeTruthy();
    await expect(page.getByTestId('customer.firstName')).toBeVisible();
  });

  test('should create a new user', async ({ page }) => {
    testUser.user = 'user' + Math.floor(Math.random() * 10000);
    await page.getByTestId('customer.firstName').fill('John');
    await page.getByTestId('customer.lastName').fill('Doe');
    await page
      .getByTestId('customer.address.street')
      .fill('742 Evergreen Terrace');
    await page.getByTestId('customer.address.city').fill('Springfield');
    await page.getByTestId('customer.address.state').fill('CA');
    await page.getByTestId('customer.address.zipCode').fill('90011');
    await page.getByTestId('customer.phoneNumber').fill('+14185438090');
    await page.getByTestId('customer.ssn').fill('123456789');
    await page.getByTestId('customer.username').fill(testUser.user);
    await page.getByTestId('customer.password').fill(testUser.pass);
    await page.getByTestId('repeatedPassword').fill(testUser.pass);
    await page.getByRole('button', { name: 'Register' }).click();

    // Expect a successful message to confirm the new user is registered.
    await expect(
      page.getByText(
        'Your account was created successfully. You are now logged in.',
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: `Welcome ${testUser.user}` }),
    ).toBeVisible();

    console.log('User created: ' + testUser.user);
    await page.getByRole('link', { name: 'Log Out' }).click();
  });
  test('existing user', async ({ page }) => {
    await page.getByTestId('customer.firstName').fill('John');
    await page.getByTestId('customer.lastName').fill('Doe');
    await page
      .getByTestId('customer.address.street')
      .fill('742 Evergreen Terrace');
    await page.getByTestId('customer.address.city').fill('Springfield');
    await page.getByTestId('customer.address.state').fill('CA');
    await page.getByTestId('customer.address.zipCode').fill('90011');
    await page.getByTestId('customer.phoneNumber').fill('+14185438090');
    await page.getByTestId('customer.ssn').fill('123456789');
    await page.getByTestId('customer.username').fill(testUser.user);
    await page.getByTestId('customer.password').fill(testUser.pass);
    await page.getByTestId('repeatedPassword').fill(testUser.pass);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByTestId('customer.username.errors')).toContainText(
      'This username already exists.',
    );
  });
  test('passwords do not match', async ({ page }) => {
    // @ts-ignore
    testUser.user = 'user' + Math.floor(Math.random() * 10000);
    await page.getByTestId('customer.firstName').fill('John');
    await page.getByTestId('customer.lastName').fill('Doe');
    await page
      .getByTestId('customer.address.street')
      .fill('742 Evergreen Terrace');
    await page.getByTestId('customer.address.city').fill('Springfield');
    await page.getByTestId('customer.address.state').fill('CA');
    await page.getByTestId('customer.address.zipCode').fill('90011');
    await page.getByTestId('customer.phoneNumber').fill('+14185438090');
    await page.getByTestId('customer.ssn').fill('123456789');
    await page.getByTestId('customer.username').fill(testUser.user);
    await page.getByTestId('customer.password').fill(testUser.pass);
    await page.getByTestId('repeatedPassword').fill('1234');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByTestId('repeatedPassword.errors')).toContainText(
      'Passwords did not match.',
    );
  });
});
