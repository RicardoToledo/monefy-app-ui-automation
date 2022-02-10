const { config } = require('./wdio.conf');
const path = require('path');

// Appium capabilities
config.capabilities = [
    {
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'uiautomator2',
        'appium:platformVersion': '10',
        'appium:app': path.resolve('./apps/com.monefy.app.lite_2021-12-17.apk'),
        'appium:appPackage': 'com.monefy.app.lite',
        // 'appium:noReset': true,
        'appium:appActivity': 'com.monefy.activities.main.MainActivity_'
    }
];

/**
 * To run all tests concurrently and with no order
 * this specs should be uncommented and suites commented
 * also the onboarding functionality would need to be
 * moved to the beforeHook in './wdio.conf'
 */
// config.specs = [
//     './test/specs/android/**/*.js'
// ];

config.suites = {
    end2end: [
        [
            './test/specs/android/onboarding.spec.js',
            './test/specs/android/income.spec.js',
            './test/specs/android/expense.spec.js',
            './test/specs/android/balance.spec.js',
            './test/specs/android/account.spec.js',
            './test/specs/android/search.spec.js'
        ]
    ]
}

exports.config = config;