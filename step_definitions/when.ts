import {defineSupportCode, When} from 'cucumber';
import {protractor}              from 'protractor';
import {SearchPageObject}        from '../pages/searchPage';

/**
 * Created by Prasanna Dommalapati on 11/09/2018.
 */
const search: SearchPageObject = new SearchPageObject();

When(/^I search for "(.*?)"$/, searchFor);


function searchFor(text) {

    return Promise.resolve()
                  .then(() => search.searchTextBox.clear())
                  .then(() => search.searchTextBox.sendKeys(text))
                  .then(() => search.searchTextBox.sendKeys(protractor.Key.ENTER));
}
