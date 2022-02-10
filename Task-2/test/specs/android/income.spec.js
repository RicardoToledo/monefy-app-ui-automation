import HomeScreen from '../../screens/home.screen'
import incomeScreen from '../../screens/transaction.screen'
import { convertNumberToMoneyString } from '../../helpers/utils';

let incomeTransaction = {};

describe('Income operations', () => {
    beforeEach(async () => {
        await HomeScreen.waitForIsShown(true);
    });

    it('should be able of correctly Create a new random income in Cash account with random category for today\'s date', async () => {
        incomeTransaction = await incomeScreen.createTransaction('income', 3);// 3-digit random income
        await expect(await HomeScreen.confirmationActionMessage).toHaveText(`${incomeTransaction.category}: ${convertNumberToMoneyString(incomeTransaction.amount)} added`);
    });

    it('should be able of correctly Read the last added income transaction in balance list', async () => {
        await HomeScreen.readLastTransaction(incomeTransaction);
    });

    it('should be able of correctly Update the last added income transaction in balance list', async () => {
        incomeTransaction = await incomeScreen.createTransaction('updateLast', 3);
        await expect(await HomeScreen.confirmationActionMessage).toHaveText('Record was updated');
        await HomeScreen.readLastTransaction(incomeTransaction);
    });
    
    it('should be able of correctly Delete the last added income transaction in balance list', async () => {
        await HomeScreen.deleteAllTransactions();
    });
});
