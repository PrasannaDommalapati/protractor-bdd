import {defineSupportCode, Given} from 'cucumber';
import {browser}                  from 'protractor';
import {SearchPageObject}         from '../pages/searchPage';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
/**
 * Created by Prasanna Dommalapati on 11/09/2018.
 */
const search: SearchPageObject = new SearchPageObject();

Given(/^I am on "(.*?)" search page$/, inSearchPage);

async function inSearchPage(text) {

    let actual = (text === 'google') ? 'Google' : text.concat(' - Google Search');
    await getURL();

    return expect(browser.getTitle()).to.eventually.equal(actual);
}

function getURL() {
    return Promise.resolve()
        .then(() => browser.getPageSource())
        .then(console.log);

}