import AppScreen from './app.screen';

class OnboardingScreen extends AppScreen {
    
    constructor() {
        super('//androidx.viewpager.widget.ViewPager[@resource-id="com.monefy.app.lite:id/pager"]');
    }
    
    get continueButton() {return $('//android.widget.Button[@resource-id="com.monefy.app.lite:id/buttonContinue"]');}
    get closeOfferButton() {return $('//android.widget.ImageButton[@resource-id="com.monefy.app.lite:id/buttonClose"]');}
    get offerText() {return $('//android.widget.TextView[@text="Claim your one-time welcome offer"]');}

    async tapOnCloseOfferButton() {
        await this.closeOfferButton.click();
    }

    async passOnboardingScreens() {
        while (await this.continueButton.isDisplayed()) {
            await this.continueButton.click();
        }
    }
}

export default new OnboardingScreen();