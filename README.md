# Task 1 - Monefy Exploratory Testing

Exploratory testing session for [Monefy](https://itunes.apple.com/us/app/monefy-money-manager/id1212024409?) iOS application.

### Mission
To discover the limits, features, issues, and capabilities of the Monefy app to use that knowledge to create a set of proposed test cases for automation.

**Duration**: No more than 2 to 3 hours in total.

## Exploratory testing charters

| Charter (Explore target)          | Income operations                                                                                                                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose (to discover information) | To analyze all the different and possible income operations and their effect on the app                                                                                                |
| Test Cases (Resources)            | Test of CRUD operations<br>Negative test cases when entering the transaction<br>Edge cases / Boundary value strategies for input fields                                                |
| Priority                          | High, because this function is essential to use the app                                                                                                                                |
| \--------                         | \--------                                                                                                                                                                              |
| Charter                           | Expense operations                                                                                                                                                                     |
| Purpose                           | To analyze all the different and possible income operations and their effect on the app                                                                                                |
| Test Cases                        | Test of CRUD operations<br>Negative test cases when entering the transaction<br>Edge cases / Boundary value strategies for input fields                                                |
| Priority                          | High, because this function is essential to use the app                                                                                                                                |
| \--------                         | \--------                                                                                                                                                                              |
| Charter                           | Limits of free version                                                                                                                                                                 |
| Purpose                           | To define what app's features are allowed and what are blocked due being a free version                                                                                                |
| Test Cases                        | Tap on all action buttons to verify if the feature is allowed/included<br>Attempt to trigger actions and behaviors based on gestures                                                   |
| Priority                          | Medium, in terms of functionality its impact is not at high, however, getting to know this information is very useful to define next charters and strategies, that's why this is next. |
| \--------                         | \--------                                                                                                                                                                              |
| Charter                           | Edition and management of transactions                                                                                                                                                 |
| Purpose                           | To confirm that different edit operations performed on transactions will not affect negatively the data integrity.                                                                     |
| Test Cases                        | Test all editable input fields and monitor their impact in transactions and balance                                                                                                    |
| Priority                          | High, because as income and expense this function is capable of modifying the main aspects of the app                                                                                  |
| \--------                         | \--------                                                                                                                                                                              |
| Charter                           | Accounts operations                                                                                                                                                                    |
| Purpose                           | To analyze all the different and possible income operations and their effect on the app                                                                                                |
| Test Cases                        | Test of CRUD operations<br>Negative test cases when entering the transaction<br>Edge cases / Boundary value strategies for input fields                                                |
| Priority                          | High, because this function affects already registered transactions                                                                                                                    |
| \--------                         | \--------                                                                                                                                                                              |
| Charter                           | Settings                                                                                                                                                                               |
| Purpose                           | Discover all the available settings and their impact on the app's usability and functionality                                                                                          |
| Test Cases                        | Verify each one of the settings and the change that provokes                                                                                                                           |
| Priority                          | Medium, you can use the app with its default settings, however, several things can be modified from here                                                                               |
| \--------                         | \--------                                                                                                                                                                              |
| Charter                           | Categories                                                                                                                                                                             |
| Purpose                           | Impact of editing only the possible fields for this section                                                                                                                            |
| Test Cases                        | Update categories<br>Delete categories                                                                                                                                                 |
| Priority                          | Medium, not all CRUD operations are available                                                                                                                                          |
| \--------                         | \--------                                                                                                                                                                              |
| Charter                           | Filter                                                                                                                                                                                 |
| Purpose                           | To experiment with diverse filters in case the feature does more                                                                                                                       |
| Test Cases                        | Test all date options, including the ones with inputs<br>Test the boundaries<br>Verify correct UI and information when applied                                                         |
| Priority                          | Low, this is a function that will only show/read data                                                                                                                                  |

### Findings from your charters. Did everything work as expected? What bugs were discovered?

- Installation and first execution were fine
- Free version of the app restricts access to:
    - Setting a password
    - Add new category
    - Currencies section (but you can change the used currency on settings)
    - Dark theme
    - Synchronization with cloud services
- Improvement or low bug: Tutorial hint about changing currency automatically moves you to focus on the setting
- It is allowed to delete complete accounts and categories along with the transactions in them without any warning. 
- It is possible to merge accounts and categories

### Prioritisation of charters - which area of the app or testing would you explore first and why?

Income and expense operations with a positive/happy path testing approach: The app's purpose or core is to keep track of your income and expenses operations, you need to register your operations using one of these two types of transactions, this is the most important part because without these two buttons in the app you can do anything meaningful, your balance will always be at $0.

Each charter contains a section with the assigned priority.

### How much time you have planned for each charter?

15 minutes per charter at most, having 8 charters * 15 minutes = 2 hours, as the limit is 3 hours at maximum this gives me another hour to document and if needed take more time in a charter or adapt accordingly to what has been found. In the best-case scenario, I don't need this extra hour and can deliver early.

### What kind of risks you need to mitigate for this type of application?

When testing financial applications you need to be very aware that the application will be dealing with the customer’s money and sensitive financial data, therefore, they are required to be tested thoroughly.

Risks related to:
- Data Integrity, in all possible levels correct data input and output should be verified, as the money is the center of the app we need to be sure all calculations and operations work as expected.
- Security, big emphasis on this area as financial apps handle sensitive financial and personal data.
- It is essential to check that the app functions from a user’s point of view and all workflows and business requirements are correctly covered along with their respective edge scenarios.
