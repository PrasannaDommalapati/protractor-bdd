import {Given}               from 'cucumber';
import {browser, protractor} from 'protractor';
import {LoginPageObject}     from '../pages/login';

const chai                     = require('chai')
    .use(require('chai-as-promised'));
const expect                   = chai.expect;
/**
 * Created by Prasanna Dommalapati on 11/09/2018.
 */
const loginPO: LoginPageObject = new LoginPageObject();

Given(/^I am on "(.*?)" search page$/, inSearchPage);
Given(/^I navigate to "(.*?)"$/, navigateTo);

function inSearchPage(text) {

    let ExpectedTitle = (text === 'google') ? 'Google' : text.concat(' - Google Search');

    return expect(browser.getTitle()).to.eventually.equal(ExpectedTitle);
}

function navigateTo(url) {

    return browser.get(url);

}

// function loginDetails(credentials) {
//
//     return Promise.resolve()
//                   .then(() => credentials.rawTable.forEach(login));
//
// }

// function login(credentials) {
//
//      const username = credentials.shift();
//      const password = credentials.shift();
//
//     return Promise.resolve()
//                   .then(() => loginPO.password.sendKeys(password))
//                   .then(() => loginPO.username.sendKeys(username))
//                   .then(() => loginPO.password.sendKeys(protractor.Key.ENTER));
//
// }
