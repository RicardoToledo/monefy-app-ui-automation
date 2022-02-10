import AppScreen from './app.screen';
import HomeScreen from './home.screen';
import { generateRandomIntNumber } from '../helpers/utils'
import faker from '@faker-js/faker';

class AccountScreen extends AppScreen{

    constructor() {
        super('//android.widget.EditText[@resource-id="com.monefy.app.lite:id/editTextCategoryName"]');
    }

    // Account screen selectors
    get accountNameInput() {return $('//android.widget.EditText[@resource-id="com.monefy.app.lite:id/editTextCategoryName"]')}
    get addAccountButton() {return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/save"]')}
    get imagesGrid() { return $('//android.widget.GridView[@resource-id="com.monefy.app.lite:id/gridViewCategoryImages"]').$$('android.widget.FrameLayout'); }
    get backButton() {return $('//android.widget.ImageButton[@content-desc="Navigate up"]')}
    get deleteAccountButton() {return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/delete"]')}

    async chooseRandomAccountImage() {
        const numberOfImages = await this.imagesGrid.length - 1;
        const randomChildIndex = generateRandomIntNumber(0, numberOfImages);
        const selectedImage = this.imagesGrid[randomChildIndex];
        await selectedImage.click();
    }

    async fillNewAccount() {
        let accountName = faker.finance.accountName();
        await HomeScreen.openAccountsList();
        await HomeScreen.newAccountButton.click();
        await this.accountNameInput.setValue(accountName);
        await this.chooseRandomAccountImage();
        await this.addAccountButton.click();
        return accountName;
    }

    async updateAccount(oldAccountName) {
        let newAccountName = faker.finance.accountName();
        await HomeScreen.openAccount(oldAccountName);
        await this.accountNameInput.setValue(newAccountName);
        await this.chooseRandomAccountImage();
        await this.backButton.click();
        return newAccountName;
    }

    async assertAccountIslisted(accountName) {
        await HomeScreen.openAccountsList();
        let accountSelector = this.textViewByTextSelector.replace(/{TEXT}/, accountName)// Creates selector by text
        await expect(await $(accountSelector)).toBeDisplayed();
        await expect(await $(accountSelector)).toHaveText(accountName);
        await HomeScreen.menuToolbarButton.click();
    }

}

export default new AccountScreen();