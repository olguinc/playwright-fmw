# Playwright Automation Framework | ParaBank

## Overview

This repository provides an end-to-end automation framework for the ParaBank demo site using Playwright and TypeScript. The design prioritizes scalability, reliability, and maintainability.

Application under test: https://parabank.parasoft.com/parabank/

## Features

- TypeScript-based Playwright framework.
- Registration flow test coverage.
- Page Object Model for reusable UI interactions.
- Test data factory for unique user generation.
- HTML and list reporting.
- CI-ready scripts and strict type checking.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- npm

## Project Structure

```text
.
├── fixtures/                 # Domain fixtures (dependency injection for tests)
│   └── registration.fixture.ts
├── pages/                    # Page objects (UI actions and locators)
│   └── registration.page.ts
├── test-data/                # Test data files
│   └── user.factory.ts       # User data factory/builders
├── tests/                    # Test specs (organized by features)
│   └── registration.spec.ts
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript compiler configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

Note: this structure follows a clear separation of responsibilities: `tests/` defines scenarios, `fixtures/` provides consistent dependency injection setup, `pages/` encapsulates UI behavior, and `test-data/` provides reusable input data.

## Test Scenarios

| # | Feature | Scenario | Expected Result |
|---|---------|----------|-----------------|
| 1 | Registration | Successful new user registration | Success message and welcome heading with username are visible |
| 2 | Registration | Attempt to register with an existing username | Inline error: "This username already exists." |
| 3 | Registration | Password and confirm password do not match | Inline error: "Passwords did not match." |

## Test Design Principles

- Independent tests: every test is self-contained and avoids shared mutable state.
- Stable selectors: selectors use the configured test id attribute and semantic locators.
- Reusability: shared UI actions live in page objects.
- Consistent dependency injection: domain fixtures provide pages and test data setup.
- Data isolation: each execution creates unique usernames to avoid collisions.
- Debuggability: trace, screenshots, and video are retained on failures according to config.

## Prerequisites

- Node.js 18 or newer
- npm

## Installation

```sh
npm ci
npx playwright install --with-deps
```

## Running Tests

```sh
npm test                  # Run all tests headless
npm run test:smoke        # Fast smoke lane (@smoke on Chromium)
npm run test:headed       # Run with browser visible
npm run test:debug        # Run in debug mode
npm run test:ui           # Open Playwright UI mode
npm run test:ci           # Run with CI reporters (html, line)
npm run test:ci:smoke     # CI smoke lane on Chromium
npm run test:ci:matrix    # CI full suite (all configured projects)
npm run typecheck         # TypeScript type checking
npm run report            # Open the last HTML report
```

Run a single spec:

```sh
npx playwright test tests/registration.spec.ts
```

## Reports and Artifacts

After execution, an HTML report is generated. Open it with:

```sh
npm run report
```

On failures, traces, screenshots, and video are retained according to the Playwright configuration.

## CI Guidance

Recommended pipeline steps:

```sh
npm ci
npx playwright install --with-deps
npm run typecheck
npm run test:ci:smoke     # pull requests (fast feedback)
npm run test:ci:matrix    # main/nightly (cross-browser confidence)
```

## Execution Strategy

- Pull requests: fast smoke execution in Chromium using `@smoke` tags.
- Main branch and nightly schedule: full browser matrix (`chromium`, `firefox`, `webkit`).

## References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright best practices](https://playwright.dev/docs/best-practices)