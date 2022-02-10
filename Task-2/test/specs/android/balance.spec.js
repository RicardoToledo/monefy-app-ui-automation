import HomeScreen from '../../screens/home.screen';
import TransactionScreen from '../../screens/transaction.screen';
import { convertNumberToMoneyString } from '../../helpers/utils';

let incomeTransaction = {};
let expenseTransaction = {};
let totalIncome = 0;
let totalExpense = 0;

describe('Balance transactions', () => {
    beforeEach(async () => {
        await HomeScreen.waitForIsShown(true);
    });

    it('should be correctly calculated and show positive balance when income > expense', async () => {
        incomeTransaction = await TransactionScreen.createTransaction('income', 3);// New 3-digit Income transaction
        await expect(await HomeScreen.confirmationActionMessage).toHaveText(`${incomeTransaction.category}: ${convertNumberToMoneyString(incomeTransaction.amount)} added`);
        totalIncome +=  incomeTransaction.amount;

        expenseTransaction = await TransactionScreen.createTransaction('expense', 2);// New 2-digit Expense transaction
        await expect(await HomeScreen.confirmationActionMessage).toHaveText(`${expenseTransaction.category}: ${convertNumberToMoneyString(expenseTransaction.amount)} added`);
        totalExpense +=  expenseTransaction.amount;

        await HomeScreen.verifyAllTotalAmounts(totalIncome, totalExpense);
    });

    it('should be correctly calculated and show negative balance when expense > income', async () => {
        incomeTransaction = await TransactionScreen.createTransaction('income', 2);// New 2-digit Income transaction
        await expect(await HomeScreen.confirmationActionMessage).toHaveText(`${incomeTransaction.category}: ${convertNumberToMoneyString(incomeTransaction.amount)} added`);
        totalIncome +=  incomeTransaction.amount;

        expenseTransaction = await TransactionScreen.createTransaction('expense', 4);// New 4-digit Expense transaction
        await expect(await HomeScreen.confirmationActionMessage).toHaveText(`${expenseTransaction.category}: ${convertNumberToMoneyString(expenseTransaction.amount)} added`);
        totalExpense +=  expenseTransaction.amount;

        await HomeScreen.verifyAllTotalAmounts(totalIncome, totalExpense);
    });

    after(async () => {
        await HomeScreen.deleteAllTransactions();
    });
});
