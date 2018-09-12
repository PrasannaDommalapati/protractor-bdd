// import * as path         from 'path';
import {browser, Config} from 'protractor';
import {Reporter}        from '../support/reporter';
const argv            = require('yargs').argv;
const fs              = require('fs-extra');
const glob            = require('glob');
const firstline       = require('firstline');


const jsonReports = process.cwd() + '/reports/json';

export const config: Config = {
    beforeLaunch,

    // The address of a running selenium server.
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,

    //change this to your app url
    baseUrl: 'https://www.google.co.uk',

    capabilities: {
        //chrome headless
        browserName: 'chrome',
        chromeOptions: {
            args: [ "--headless", "--disable-gpu", "--window-size=1280,700" ]
        }

        //fire fox headless
        // browserName: 'firefox',
        //
        // 'moz:firefoxOptions': {
        //     args: [ "--headless" ]
        // }
    },

    // to test cross browser
    // multiCapabilities: [{
    //     browserName: 'chrome',
    // },
    //     {
    //         browserName: 'firefox',
    //     }],
    framework:     'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    //location to the feature files
    specs: [
        '../../features/*.feature',
    ],

    // Spec patterns are relative to the location of the spec file. They may
    // include glob patterns.
    // suites: {
    //     homepage: 'tests/e2e/homepage/**/*Spec.js',
    //     search: ['tests/e2e/contact_search/**/*Spec.js',
    //              'tests/e2e/venue_search/**/*Spec.js']
    // },

    // protractor protractor.conf.js --suite homepage,search
    noGlobals:true,
    ignoreUncaughtExceptions:true,

    onPrepare: () => {
        //only when testing a non angular apps
        browser. waitForAngularEnabled(false)
        browser.manage()
               .window()
               .maximize();
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: 'ts:ts-node/register',
        format:   'json:./reports/json/cucumber_report.json',
        require:  [
            `${process.cwd()}/dist/step_definitions/*.js`,
            `${process.cwd()}/dist/support/*.js`,


        ],
        strict:   true,
        tags:     '@Smoke or @Sanity or @Regression or @wip',
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },
};

function beforeLaunch() {

    return Promise.all([
        fs.remove(jsonReports),
        setActiveFeatures(),
    ]);
}

function setActiveFeatures() {

    const path = `${process.cwd()}/../features/**/*.feature`;

    return new Promise(resolve => {

        glob(path, null, (error, features) => {

            Promise
                .all(features.map(feature => {

                    return firstline(feature)
                        .then(line => featureIsActive(line) && config.specs.push(feature));
                }))
                .then(() => resolve());
        });
    });
}

function featureIsActive(line) {

    const tags = argv.hasOwnProperty('cucumberOpts') &&
                 argv.cucumberOpts.hasOwnProperty('tags') ? argv.cucumberOpts.tags.toString() : '';

    const wip = !!tags.match(/@wip/);

    return !wip ? !line.match(/@todo/) : !!line.match(/@wip/);
}

