const SELECTORS = {
    ANDROID: {
        ALERT_TITLE: '*//android.widget.TextView[@resource-id="com.monefy.app.lite:id/alertTitle"]',
        ALERT_MESSAGE: '*//android.widget.TextView[@resource-id="com.monefy.app.lite:id/message"]',
        ALERT_BUTTON: '*//android.widget.Button[@text="{BUTTON_TEXT}"]',
    }
    // IOS Selectors can be added here too
};

class NativeAlert {

    // Wait for the alert to exist
    static async waitForIsShown(isShown = true) {
        const selector = SELECTORS.ANDROID.ALERT_TITLE;
        return $(selector).waitForExist({
            timeout: 11000,
            reverse: !isShown,
        });
    }

    /**
     * Press a button using the text of the button: receives a string, 
     * transforms it to uppercase, and replace it in the selector to 
     * click on the button
     * @param {string} selector 
     */
    static async tapOnButton(selector) {
        const buttonSelector = SELECTORS.ANDROID.ALERT_BUTTON.replace(/{BUTTON_TEXT}/, selector.toUpperCase())
        await $(buttonSelector).click();
    }

    // Returns the the Alert's title and message
    static async text() {
        return `${await $(SELECTORS.ANDROID.ALERT_TITLE).getText()}\n${await $(SELECTORS.ANDROID.ALERT_MESSAGE).getText()}`;
    }

}

export default NativeAlert;