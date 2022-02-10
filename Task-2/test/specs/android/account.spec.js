import HomeScreen from '../../screens/home.screen';
import AccountScreen from '../../screens/account.screen';
import NativeAlert from '../../screens/components/nativeAlert';

let accountName;

describe('Accounts operations', () => {
    beforeEach(async () => {
        await HomeScreen.waitForIsShown(true);
    });

    it('should be able of correctly Create a new account', async () => {
        accountName = await AccountScreen.fillNewAccount();
        await expect(await HomeScreen.confirmationActionMessage).toHaveText('New account was added');
    });

    it('should be able of correctly Read last account added', async () => {
        await AccountScreen.assertAccountIslisted(accountName);
    });

    it('should be able of correctly Update last account added', async () => {     
        accountName = await AccountScreen.updateAccount(accountName);
        await AccountScreen.assertAccountIslisted(accountName);
    });

    it('should be able of correctly Delete last account added', async () => {
        await HomeScreen.openAccount(accountName);
        await AccountScreen.deleteAccountButton.click();
        await NativeAlert.waitForIsShown(true);
        await NativeAlert.tapOnButton('OK');
        await expect(await HomeScreen.confirmationActionMessage).toHaveText('Account was deleted');
    });
});