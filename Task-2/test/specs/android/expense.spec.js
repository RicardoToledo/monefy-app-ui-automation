import HomeScreen from '../../screens/home.screen'
import expenseScreen from '../../screens/transaction.screen'
import { convertNumberToMoneyString } from '../../helpers/utils';

let expenseTransaction = {};

describe('Expense Operations', () => {
    beforeEach(async () => {
        await HomeScreen.waitForIsShown(true);
    });

    it('should be able of correctly Create a new random expense in Cash account with random category for today\'s date', async () => {
        expenseTransaction = await expenseScreen.createTransaction('expense', 3);// 3-digit random expense
        await expect(await HomeScreen.confirmationActionMessage).toHaveText(`${expenseTransaction.category}: ${convertNumberToMoneyString(expenseTransaction.amount)} added`);
    });

    it('should be able of correctly Read the last added expense transaction in balance list', async () => {
        await HomeScreen.readLastTransaction(expenseTransaction);
    });

    it('should be able of correctly Update the last added expense transaction in balance list', async () => {
        expenseTransaction = await expenseScreen.createTransaction('updateLast', 3);
        await expect(await HomeScreen.confirmationActionMessage).toHaveText('Record was updated');
        await HomeScreen.readLastTransaction(expenseTransaction);
    });
    
    it('should be able of correctly Delete the last added expense transaction in balance list', async () => {
        await HomeScreen.deleteAllTransactions();
    });
});
