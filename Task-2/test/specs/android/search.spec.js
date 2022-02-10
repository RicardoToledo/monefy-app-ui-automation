import TransactionScreen from '../../screens/transaction.screen';
import SearchScreen from '../../screens/search.screen';
import HomeScreen from '../../screens/home.screen';
import faker from '@faker-js/faker';

let transaction;

describe('Search bar', () => {
    before(async () => {
        transaction = await TransactionScreen.createTransaction('income', 3);
    });
    beforeEach(async () => {
        await HomeScreen.waitForIsShown(true);
    });

    it('should correctly show transaction searched by transaction\'s note', async () => {
        await SearchScreen.searchTransaction(transaction.note);
        await SearchScreen.assertTransaction(transaction);
    });

    it('should NOT show non-existent transaction searched by random note', async () => {
        await SearchScreen.searchTransaction(faker.lorem.word());
        await expect(await SearchScreen.emptyResults).toBeDisplayed();
        await SearchScreen.backToHome.click();
    });

    after(async () => {
        await HomeScreen.deleteAllTransactions();
    });
});