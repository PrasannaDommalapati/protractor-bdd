import * as path         from 'path';
import {browser, Config} from 'protractor';
import {Reporter}        from '../support/reporter';

const jsonReports = process.cwd() + '/reports/json';

export const config: Config = {

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,

    //change this to your app url
    baseUrl: 'https://www.google.com',

    capabilities: {
        browserName: 'chrome',
    },

    framework:     'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    //location to the feature files
    specs: [
        '../../features/*.feature',
    ],

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage()
               .window()
               .maximize();
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: 'ts:ts-node/register',
        format:   'json:./reports/json/cucumber_report.json',
        require:  [
            '../../typeScript/stepDefinitions/*.js',
            '../../typeScript/support/*.js',
        ],
        strict:   true,
        tags:     '@Smoke or @Sanity or @Regression or @Wip',
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },
};
