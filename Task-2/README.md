# Task 2 - Monefy Automation Suite

This is an automation testing repository using [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) with [Node.js](https://nodejs.org/), [Webdriverio](https://webdriver.io/) and [Appium](https://testcafe.io/) to automate the most important test scenarios based on their  business impact for the [Monefy](https://www.apkmonk.com/app/com.monefy.app.lite/) Android application.

## Table of contents

- [Installation](#installation)
    + [Requirements](#requirements)
    + [Running tests](#running-tests)
  * [Extra: CI/CD with GitHub Actions](#extra-cicd-with-github-actions)
- [Approach for solving the problem](#approach-for-solving-the-problem)
    + [Solution](#solution)
    + [Tech stack](#tech-stack)
- [Test Suite](#test-suite)
    + [Priority criteria](#priority-criteria)
    + [Not in scope](#not-in-scope)
  * [Possible Improvements](#possible-improvements)
  * [Automating for different test levels](#automating-for-different-test-levels)
  * [License](#license)

# Installation
### Requirements

In order to run the tests you need to have installed:
- [Node.js v12](https://nodejs.org/download/release/v12.22.8/)
- [Java +8](https://www.oracle.com/java/technologies/downloads/#java8)
- [Appium Server GUI](https://github.com/appium/appium-desktop/releases)
    - If you have configuration issues you can use [Appium Doctor](https://github.com/appium/appium-doctor)
- Android Studio and a virtual device with Android version 10.0 / API 29
    - Here's a useful [guide](https://docs.expo.dev/workflow/android-studio-emulator) from Expo framework's documentation

### Running tests
1. Clone the repository by running `git clone https://github.com/`
2. Move to the root folder of this repository and run `npm install`
3. Start the Android emulator
4. Start Appium server with default configurations:
    - Host: 0.0.0.0
    - Port: 4723
5. Run test suite with command:
```bash
$ npm run android-end2end
```

> **Note:** Please refer to [Webdriver.IO's "Run Selected Tests" documentation](https://webdriver.io/docs/organizingsuites#run-selected-tests) to have a complete list of different ways to run tests.


## Extra: CI/CD with GitHub Actions

The project integrates [GitHub Actions](https://github.com/features/actions) as its CI/CD platform.

A workflow is already integrated into this repo which automates a full test run in a macOS virtual machine every time a pull request is created for the `main` branch.

The `.yml` file with the setup can be found in this repo's path: [.github/workflows/android-appium-automation.yml](.github/workflows/android-appium-automation.yml)

# Approach for solving the problem

These are the steps I took as the approach for this project:

1. Understood the problem or what was being requested
2. Got to know the Application under test and all its capabilities and limitations
3. Defined the test suite with its test scenarios organized by modules and features/operations
    - Focused on good coverage, rather than covering all possible test cases
    - Defined coverage by selecting a set of core modules and their CRUD operations: The minimum set of features that a user will need to correctly use the app
    - Designated priority and order of execution
4. Researched what tools would help me achieve the task while considering different factors (see Tech stack section for details) and selected a stack
5. Started coding while testing and documenting my progress


### Solution

My solution is a test suite composed of the next characteristics: 

- An End-to-End flow focused on functional testing simulating the actions a user would normally do for a set of core modules and its functionalities
- The suite runs in a single session and will reset the state of the app when finished
- *Each test group or spec on the framework can be independently executed too
- An output will be sent to the terminal with test execution results and time.
- **Extra:** a CI/CD integration with Github Actions

*Except for the case of "Tutorial artifacts (Onboarding and Hints)" as every time the app runs for the first time a set of onboarding screens and hints will be shown and they need to be handled before continuing with the next tests.

### Tech stack

I chose this tech stack considering two strong factors, compatibility, and scalability, an ideal stack can be used with different implementations and platforms such as languages, plugins, and automation practices while being scalable, meaning that the suite can easily grow and be maintained while new devices, operative systems, and cross-device testing can be integrated.

In the example of the `monefy` app, the app is available for both Android/iOS devices, and if I would be creating a framework from scratch for it it would be a lot easier to use the same stack for both apps instead of using the native solutions which each one will take it's own learning curve to start contributing.

For the individual choices here is a brief list of advantages of each one of them:
```
JS
- One of the most used and popular programming languages for web and hybrid/native app development
- Simple to adopt with a vast repository of frameworks, libraries, and support

Page Object Model pattern
- One of the most popular patterns used for automation projects, easy to implement with good scalability
- Strong Reusability and maintainability, UI changes are only applied to page object classes and only written only once and used in different test cases.

Webdriver.IO
- Supports hybrid and native mobile applications running in an emulator or real device along with web and native desktop applications
- Uses a friendly syntax with multiple choices to integrate libraries, plugins, and services

Appium
- Open-source project with a good online community, [extensive platform support](https://appium.io/docs/en/about-appium/platform-support/) and testing modalities (native, hybrid and mobile web apps on iOS/Android and Windows/macOS)
- Being platform-independent creates a simple solution for multiple necessities, for example, if we need to test an app present in both Android and iOS
```

# Test Suite
### Priority criteria

As suggested, the prioritization of all test cases was mainly based on the possible business impact in case of failure of each one of the modules, as the business would be impacted if users stop using the app because it's not possible to properly use it, I was considering the question if the module's feature under test fails, does it block the user to correctly use the app?

If the answer is yes, then it's a High priority case (this applies to the core modules), if the answer is no but it's still a useful/used/important feature then its "Medium", and finally, if the answer is no in any way and this is a feature that will not impact the user significantly then it's "Low".

| Module                                    | Test Scenario                                                                                                 | Test Scenario ID | Priority |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| Tutorial artifacts (Onboarding and Hints) | should be displayed when starting the app for the first time                                                  | TS.01            | Medium*   |
|                                           | should be displayed when entering the home screen for the first time                                          | TS.02            | Low      |
| Income operations                         | should be able of correctly Create a new random income in Cash account with random category for today's date  | TS.03            | High     |
|                                           | should be able of correctly Read the last added income transaction in balance list                            | TS.04            | High     |
|                                           | should be able of correctly Update the last added income transaction in balance list                          | TS.05            | High     |
|                                           | should be able of correctly Delete the last added income transaction in balance list                          | TS.06            | High     |
| Expense operations                        | should be able of correctly Create a new random expense in Cash account with random category for today's date | TS.07            | High     |
|                                           | should be able of correctly Read the last added expense transaction in balance list                           | TS.08            | High     |
|                                           | should be able of correctly Update the last added expense transaction in balance list                         | TS.09            | High     |
|                                           | should be able of correctly Delete the last added expense transaction in balance list                         | TS.10            | High     |
| Balance trasanctions                      | should be correctly calculated and show positive balance when income > expense                                | TS.11            | High     |
|                                           | should be correctly calculated and show negative balance when expense > income                                | TS.12            | High     |
| Accounts operations                       | should be able of correctly Create a new account                                                              | TS.13            | Medium   |
|                                           | should be able of correctly Read last account added                                                           | TS.14            | Medium   |
|                                           | should be able of correctly Update last account added                                                         | TS.15            | Medium   |
|                                           | should be able of correctly Delete last account added                                                         | TS.16            | Medium   |
| Search bar                                | should correctly show transaction searched by transaction's note                                              | TS.17            | Medium   |
|                                           | should NOT show non-existent transaction searched by random note                                              | TS.18            | Medium   |

*`Tutorial artifacts (Onboarding and Hints)`: This module has a "Medium" priority as different scenarios that will depend on the app can happen, for example, there are apps that are designed in a way that will crash or be useless if something fails during the onboarding screens ("High" priority then), while there apps that avoid this behavior ("Low" priority).

### Not in scope

Modules left out of scope for this iteration and why:

- Categories: plenty of default categories already on the app, no new category can be added on the free version of the app, even if a category is edited balance and transactions remain the same.
- Settings: There's no setting that makes drastic changes to the app or that is needed to use the core features of the app, in other words, the app works out of the box
- Filter: This is only a read feature that can’t modify transactions and won't affect the core functionalities

> Note: I'm not totally discarding these modules, if this was a real project/job these could be added to a hypothetical roadmap.

## Possible Improvements

Hypothetical possible next steps and improvements for the project:
- Add [screenshots](https://dev.to/automationbro/attach-screenshots-on-failure-webdriverio-557j) on failure or even [video](https://github.com/presidenten/wdio-video-reporter) recording of the whole test suite
- Implement a different reporter according to the test management tool used by the team
- Increase coverage with deeper (more app screens and features) and different types of testing
- Filtering and organizing tests using tags or external libraries, for example, some useful filtering cases are:
    - By priority
    - By test suite/type: Smoke, Regression, by module, etc
- Ongoing code maintenance to keep it clean and scalable

## Automating for different test levels

Here is a short summary of the possibilities of automating this test suite on the different levels proposed in the [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#TheTestPyramid) framework, from top to bottom of the pyramid:

**UI tests**
```
Higher level already covered by this suite. The best practice is to be attached to the principle proposed by Mike Cohn's: "The more high-level you get the fewer tests you should have".

Pros:
- Closer to real user experience with the AUT
- Helpful for UI only tests and cross-testing

Cons:
- Slow execution time, more fragile or prompt to fail due to flakiness 
- It's possible to end up with a test ice-cream cone being difficult to maintain and taking way too long to run
```

**Integration tests**
```
Assuming the App uses a microservices architecture and we have the access it would be technically possible to cover the same operations and scenarios handled on the UI level by using the underlying API that serves the App.

Pros:
- A faster and cheaper alternative that could cover the same flows achieved by the UI layer without the flakiness inherited from it
- Useful for testing APIs/Microservices

Cons:
- If the API is not public it would be necessary to have access to their internal environment
- If only this layer is covered exists the possibility that plenty of UI bugs will raise as that's an important part to cover by our tests.
```

**Unit tests**
```
Testing the same scenarios or flows is possible but would be managed in a more granular manner as this level is focused on testing isolated functions or components at code level, in general having more unit tests than other levels is the best practice.

Pros:
- Even faster than integration testing while immediately giving feedback in a continuous testing or integration framework.
- It's best to find bugs during this phase/level as it would cost less to the team and company 

Cons:
- It can’t catch all errors, for example, using mocks and stubs is necessary when unit testing and it can't be assumed this would be enough to guarantee two components correctly interact with each other, so integration tests would be necessary, the same applies to the UI level.
- It is a time-consuming task to write test cases, maintain them and cover all the code.
```

## License
[MIT](https://choosealicense.com/licenses/mit/)