import {When}             from 'cucumber';
import {protractor}       from 'protractor';
import {SearchPageObject} from '../pages/searchPage';
import * as faker         from 'faker';

/**
 * Created by Prasanna Dommalapati on 11/09/2018.
 */
const search: SearchPageObject = new SearchPageObject();

When(/^I search for "(.*?)"$/, searchFor);

// function dataTable(data) {
//
//     return Promise.resolve()
//                   .then(() => data.rawTable.forEach(login));
// }

function searchFor(text) {

    let stext = faker.lorem.word();

    console.log(stext);
    return Promise.resolve()
                  .then(() => search.searchTextBox.clear())
                  .then(() => search.searchTextBox.sendKeys(text))
                  .then(() => search.searchTextBox.sendKeys(protractor.Key.ENTER));
}

// function login(data) {
//
//     return Promise.resolve()
//                   .then(() => search.firstName.sendKeys(data[4]));
// }
