import AppScreen from './app.screen';
import TransactionScreen from './transaction.screen';
import { HINTS } from './components/constants';
import { convertNumberToMoneyString } from '../../test/helpers/utils';

class HomeScreen extends AppScreen {

    constructor() {
        super('//android.widget.LinearLayout[@resource-id="com.monefy.app.lite:id/transaction_type_button_layout"]');
    }

    // Successful action message
    get confirmationActionMessage() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/snackbar_text"]') };

    // Superior toolbar elements
    get filterToolbarButton() { return $('~Open navigation'); }
    get searchToolbarButton() { return $('~Search records'); }
    get transferToolbarButton() { return $('~Transfer'); }
    get menuToolbarButton() { return $('~Settings'); }

    // Search elements
    get searchInput() { return $('//android.widget.EditText[@resource-id="com.monefy.app.lite:id/et_search"]') };
    get searchbackButton() { return $('//android.widget.ImageButton[@resource-id="com.monefy.app.lite:id/action_back"]') };

    // Menu sidebar -> Categories
    get categoriesButtonMenuItem() { return $('//android.widget.LinearLayout[@resource-id="com.monefy.app.lite:id/categories_button"]'); }

    // Menu sidebar -> Accounts
    get accountsButtonMenuItem() { return $('//android.widget.LinearLayout[@resource-id="com.monefy.app.lite:id/accounts_button"]'); }
    get newAccountButton() { return $('//android.widget.ImageView[@resource-id="com.monefy.app.lite:id/imageButtonAddCategory"]'); }

    // Menu sidebar -> Settings
    get settingsButtonMenuItem() { return $('//android.widget.LinearLayout[@resource-id="com.monefy.app.lite:id/settings_button"]'); }
    get languageButton() { return $('//android.widget.LinearLayout[@resource-id="com.monefy.app.lite:id/language_selection_button"]'); }
    get currencyButton() { return $('//android.widget.LinearLayout[@resource-id="com.monefy.app.lite:id/currency_selection_button"]'); }

    // Transaction buttons
    get incomeButton() { return $('//android.widget.ImageView[@resource-id="com.monefy.app.lite:id/income_button"]'); }
    get expenseButton() { return $('//android.widget.ImageView[@resource-id="com.monefy.app.lite:id/expense_button"]'); }

    // Amount texts
    get totalIncomeAmountText() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/income_amount_text"]'); }
    get totalExpenseAmountText() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/expense_amount_text"]'); }
    get totalBalanceAmountTextbox() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/balance_amount"]'); }

    // Balance list
    get balanceCategoryText() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textViewCategoryName"]') };
    get balanceTransactionAmountText() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textViewTransactionAmount"]') };
    get balanceTransactionNoteText() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textViewTransactionNote"]') };
    get emptyBalanceText() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/empty_message_text_view"]') };

    /**
     * Will assert and close all 4 four hints on the home screen, 
     * especially the last one which forces the sidebar to open
     */
    async passTutorialHints() {
        let hint, hintElement;
        for (let index = 0; index < HINTS.HOME_SCREEN.length; index++) {
            hint = HINTS.HOME_SCREEN[index];
            hintElement = this.textViewByTextSelector.replace(/{TEXT}/, hint)// Creates selector by text
            await expect(await $(hintElement)).toBeDisplayed();
            await $(hintElement).click();
        }
        await this.menuToolbarButton.click();
    }

    // ---------- Transactions: Actions methods ----------
    async tapOnTransactionButton(transactionType) {
        if (transactionType === 'income')
            await this.incomeButton.click();
        else if (transactionType === 'expense')
            await this.expenseButton.click();
    }

    async openLastTransaction() {
        if (await this.balanceCategoryText.isDisplayed() === false)// if balance list is not open
            await this.totalBalanceAmountTextbox.click();// opens balance list
        await this.balanceCategoryText.click();// opens last transaction
    }

    async openEditLastTransaction() {
        await this.openLastTransaction();
        await this.balanceTransactionAmountText.click();
    }

    async closeBalanceList() {
        if (await this.balanceCategoryText.isDisplayed())// if last transaction is open
            await this.balanceCategoryText.click();// closes last transaction
        await this.totalBalanceAmountTextbox.click();// closes balance list
    }

    /**
     * Reads and asserts the last added transaction in balance list
     * @param {Object} transaction 
     */
    async readLastTransaction(transaction) {
        await this.openLastTransaction();
        await expect(await this.balanceCategoryText).toHaveText(transaction.category);
        await expect(await this.balanceTransactionAmountText).toHaveText(convertNumberToMoneyString(transaction.amount));
        await expect(await this.balanceTransactionNoteText).toHaveText(transaction.note);
        await this.closeBalanceList();
    }

    async deleteAllTransactions() {
        while (await this.emptyBalanceText.isDisplayed() === false) {
            await this.openEditLastTransaction();
            await TransactionScreen.deleteTransactionButton.click();
            await expect(await this.confirmationActionMessage).toHaveText('Record was deleted');
        }
        await expect(await this.emptyBalanceText).toBeDisplayed();
        await this.closeBalanceList();
    }

    async verifyAllTotalAmounts(totalIncome, totalExpense) {
        await expect(await this.totalIncomeAmountText).toHaveText(convertNumberToMoneyString(totalIncome));
        await expect(await this.totalExpenseAmountText).toHaveText(convertNumberToMoneyString(totalExpense));
        await expect(await this.totalBalanceAmountTextbox).toHaveText(`Balance ${convertNumberToMoneyString(totalIncome - totalExpense)}`);
    }

    // ---------- Accounts: Actions methods ----------
    async openAccountsList() {
        await this.menuToolbarButton.click();// Open sidebar menu
        await this.accountsButtonMenuItem.click();// Select Accounts
    }

    async openAccount(accountName) {
        await this.openAccountsList();
        let accountSelector = this.textViewByTextSelector.replace(/{TEXT}/, accountName)// Creates selector by text
        await expect(await $(accountSelector)).toBeDisplayed();
        await $(accountSelector).click();
    }

}

export default new HomeScreen();