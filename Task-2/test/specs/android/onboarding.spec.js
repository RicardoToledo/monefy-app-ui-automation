import OnboardingScreen from '../../screens/onboarding.screen'
import HomeScreen from '../../screens/home.screen'

describe('Tutorial artifacts (Onboarding and Hints)', () => {
    before(async () => {
        await OnboardingScreen.waitForIsShown(true);
    });

    it('should be displayed when starting the app for the first time', async () => {
        await OnboardingScreen.passOnboardingScreens();
        await expect(await OnboardingScreen.offerText).toBeDisplayed();
        await OnboardingScreen.tapOnCloseOfferButton();
        await HomeScreen.waitForIsShown(true);
    });

    it('should be displayed when entering the home screen for the first time', async () => {
        await HomeScreen.passTutorialHints();
    });
});