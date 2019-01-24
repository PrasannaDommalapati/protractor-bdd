import {Then} from 'cucumber';
import {browser}                 from 'protractor';
import { SearchPageObject }      from "../pages/searchPage";

const chai     = require('chai').use(require('chai-as-promised'));
const expect   = chai.expect;
/**
 * Created by Prasanna Dommalapati on 11/09/2018.
 */
const search: SearchPageObject = new SearchPageObject();

Then(/^I should see page title as "(.*?)"$/,checkPage)
Then(/^I should see the url contains "(.*?)"$/,urlContains)


function checkPage(text) {

    let expectedTitle = (text === 'google') ? 'Google' : text.concat(' - Google Search');

    return expect(browser.getTitle()).to.eventually.equal(expectedTitle);
}

function urlContains(expectedUrl) {

    return Promise.resolve()
        .then(() =>browser.getCurrentUrl())
        .then(url =>expect(url).contain(expectedUrl));
}
