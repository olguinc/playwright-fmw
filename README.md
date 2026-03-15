# Playwright Automation Framework | ParaBank Project

## Overview

This repository implements an automated end-to-end testing framework for [ParaBank Demo Site](https://parabank.parasoft.com/parabank/index.htm) using [Playwright](https://playwright.dev/). The framework is focused on maintainability, scalability, and reliability.

---

## Test Strategy

### Goals

- **Automate critical user journeys** to ensure application stability.
- **Enable fast feedback** for developers via CI integration.
- **Promote code reuse** and maintainability through modular design.

### Scope

- **Functional UI tests** for user registration, login, and core banking features.
- **Negative and edge case testing** for robust coverage.
- **Cross-browser testing** (Chromium by default; easily extendable).

### Approach

- **Test Data Management:** Test data is isolated per test run to avoid conflicts.
- **Assertions:** Use Playwright’s built-in expect API for clear, reliable assertions.
- **Reporting:** HTML reports are generated for each run and uploaded as CI artifacts.

---

## Tools & Technologies

- **[Playwright](https://playwright.dev/):** Browser automation library.
- **Node.js:** JavaScript runtime.
- **GitHub Actions:** CI/CD for automated test execution.
- **HTML Reporter:** Visual test results.

---

## Project Structure

```
.
├── tests/                # Test specs (organized by features)
│   └── registration.spec.js
├── test-data/            # Test data files (if needed)
├── playwright.config.js  # Playwright configuration
├── playwright-report/    # Generated HTML reports
├── .github/workflows/    # CI configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## Patterns & Best Practices

- **Page Object Model (POM):** (Recommended for larger suites) Encapsulate page interactions in reusable classes.
- **Test Isolation:** Each test creates its own user data to avoid state leakage.
- **Consistent Selectors:** Use `data-testid` attributes for robust element targeting.
- **CI Integration:** Tests run automatically on push and pull requests.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```sh
npm ci
npx playwright install --with-deps
```

### Running Tests Locally

```sh
npm test
```

### Viewing Reports

After a test run, open the HTML report:

```sh
npx playwright show-report
```

---

## Continuous Integration

- **GitHub Actions** is configured in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).
- On each push/PR to `main`/`master`, tests are executed and reports are uploaded as artifacts.

---

## Contributing

- **Naming:** Use descriptive names for test cases and variables.
- **Structure:** Place new specs in the `tests/` directory.
- **Selectors:** Prefer `data-testid` attributes for targeting elements.
- **Pull Requests:** Ensure all tests pass locally and in CI before submitting.

---

## Troubleshooting

- **Flaky Tests:** Review selectors and add appropriate waits.
- **Test Data Collisions:** Ensure unique data per test run.
- **CI Failures:** Download and inspect the Playwright HTML report artifact.

---

## References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)