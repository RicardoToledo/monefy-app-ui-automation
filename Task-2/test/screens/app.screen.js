export default class AppScreen {

    constructor(selector) {
        this.selector = selector;
    }

    get textViewByTextSelector() { return '//android.widget.TextView[@text="{TEXT}"]' };

    /**
     * Wait for the element to be visible
     * @param {boolean} isShown
     */
    async waitForIsShown(isShown = true) {
        return $(this.selector).waitForDisplayed({
            reverse: !isShown, // if true waits for the element to not be displayed. false = to be displayed
        });
    }

}