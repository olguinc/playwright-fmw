import type { Locator, Page } from '@playwright/test';
import type { UserRegistrationData } from '../test-data/user.factory';

export class RegistrationPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly street: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly repeatedPassword: Locator;
  readonly submitButton: Locator;
  readonly usernameError: Locator;
  readonly repeatedPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId('customer.firstName');
    this.lastName = page.getByTestId('customer.lastName');
    this.street = page.getByTestId('customer.address.street');
    this.city = page.getByTestId('customer.address.city');
    this.state = page.getByTestId('customer.address.state');
    this.zipCode = page.getByTestId('customer.address.zipCode');
    this.phoneNumber = page.getByTestId('customer.phoneNumber');
    this.ssn = page.getByTestId('customer.ssn');
    this.username = page.getByTestId('customer.username');
    this.password = page.getByTestId('customer.password');
    this.repeatedPassword = page.getByTestId('repeatedPassword');
    this.submitButton = page.getByRole('button', { name: 'Register' });
    this.usernameError = page.getByTestId('customer.username.errors');
    this.repeatedPasswordError = page.getByTestId('repeatedPassword.errors');
  }

  async goto(): Promise<void> {
    await this.page.goto('index.htm');
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async isReady(): Promise<void> {
    await this.firstName.waitFor({ state: 'visible' });
  }

  async registerUser(user: UserRegistrationData): Promise<void> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.street.fill(user.street);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.zipCode.fill(user.zipCode);
    await this.phoneNumber.fill(user.phoneNumber);
    await this.ssn.fill(user.ssn);
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.repeatedPassword.fill(user.repeatedPassword ?? user.password);
    await this.submitButton.click();
  }
}
