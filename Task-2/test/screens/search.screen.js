import AppScreen from './app.screen';
import HomeScreen from './home.screen';
import { convertNumberToMoneyString } from '../helpers/utils';

class SearchScreen extends AppScreen {

    constructor() {
        super('//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/search_view"]');
    }

    get backToHome() { return $('~Open navigation'); }
    
    // Search results - first element properties
    get transactionNote() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/note_text_view"]') };
    get transactionAmount() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/amount_text_view"]') };
    get transactionCategory() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/title_text_view"]') };
    
    // Search results - empty results
    get emptyResults() { return $('//android.widget.TextView[@resource-id="com.monefy.app.lite:id/empty_results_text_view"]') };

    async searchTransaction(note) {
        await HomeScreen.searchToolbarButton.click();
        await HomeScreen.searchInput.setValue(note);
        driver.pressKeyCode(66);// Press Enter
        await this.waitForIsShown(true);
    }

    async assertTransaction(transaction) {
        await expect(await this.transactionNote).toHaveText(transaction.note);
        await expect(await this.transactionCategory).toHaveText(transaction.category);
        await expect(await this.transactionAmount).toHaveText(convertNumberToMoneyString(transaction.amount));
        await this.backToHome.click();
    }

}

export default new SearchScreen();