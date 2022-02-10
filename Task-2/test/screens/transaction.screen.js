import AppScreen from './app.screen';
import HomeScreen from './home.screen';
import { faker } from '@faker-js/faker';
import { generateRandomIntNumber } from '../helpers/utils';

class TransactionScreen extends AppScreen {

    constructor() {
        super('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/amount_text"]');
    }

    // First transaction step
    get transactionAmountInput() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/amount_text"]'); }
    get deleteAmountButton() { return $('//android.widget.ImageButton[@resource-id="com.monefy.app.lite:id/buttonKeyboardClear"]'); }
    get transactionNoteInput() { return $('//android.widget.EditText[@resource-id="com.monefy.app.lite:id/textViewNote"]'); }
    get chooseCategoryButton() { return $('//android.widget.Button[@resource-id="com.monefy.app.lite:id/keyboard_action_button"]'); }
    get deleteTransactionButton() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/delete"]'); }
    get keyboardNumberSelector() { return '//android.widget.Button[@resource-id="com.monefy.app.lite:id/buttonKeyboard{NUMBER}"]' };

    // Second transaction step
    get categoriesGrid() { return $('//android.widget.GridView[@resource-id="com.monefy.app.lite:id/gridViewCategories"]').$$('android.widget.FrameLayout'); }

    /**
     * tap random Int number of 'numberOfDigits' length digit by digit
     * using the app's keyboard, 'numberOfDigits' will default to 1 
     * if no argument is passed
     * @param {number} numberOfDigits 
     * @returns {string} random typed Int number of 'numberOfDigits' length
     */
    async tapRandomAmount(numberOfDigits = 1) {
        if (await this.transactionAmountInput.getText() !== '0')
            await this.deleteAmount();
        for (let index = 1; index <= numberOfDigits; index++) {
            let randomNumber = index === 1 ? generateRandomIntNumber(1, 9) : generateRandomIntNumber(0, 9);// Making sure the first digit is not 0
            let numberKeyboardButton = this.keyboardNumberSelector.replace(/{NUMBER}/, randomNumber);// Creates selector for selected number
            await $(numberKeyboardButton).click();
        }
        return parseInt(await this.transactionAmountInput.getText());
    }

    async deleteAmount() {
        const numberOfDigits = await (await this.transactionAmountInput.getText()).length;
        for (let index = 1; index <= numberOfDigits; index++) {
            await this.deleteAmountButton.click();
        }
    }

    /**
     * Types the received parameter as a note for the transaction,
     * it will delete the field if has text on it and
     * use a random product name from faker if no argument is passed
     * @param {string} note 
     */
    async addTransactionNote(note = faker.commerce.productName()) {
        if (await this.transactionNoteInput.getText().length > 0)
            await this.transactionNoteInput.clearValue();
        await this.transactionNoteInput.setValue(note);
        return note;
    }

    /**
     * Randomly selects a category child and click it
     * @returns {string} name of selected category
     */
    async chooseRandomCategory() {
        await this.chooseCategoryButton.click();
        const numberOfCategories = await this.categoriesGrid.length - 2; //not considering last child as it's add button
        const randomChildIndex = generateRandomIntNumber(0, numberOfCategories);
        const selectedCategoryElement = this.categoriesGrid[randomChildIndex].$('android.widget.LinearLayout').$('android.widget.TextView');
        const selectedCategoryName = await selectedCategoryElement.getText();
        await selectedCategoryElement.click();
        return selectedCategoryName;
    }

    /**
     * Edit last created transaction or creates a new one
     * @param {string} transactionType 
     * @param {number} numberOfDigits 
     * @param {string} note 
     * @returns {Object} new transaction
     */
    async createTransaction(transactionType, numberOfDigits, note) {
        if (transactionType === 'updateLast')
            await HomeScreen.openEditLastTransaction();
        else
            await HomeScreen.tapOnTransactionButton(transactionType);
        return {
            amount: await this.tapRandomAmount(numberOfDigits),
            note: await this.addTransactionNote(note),
            category: await this.chooseRandomCategory()
        };
    }

}

export default new TransactionScreen();