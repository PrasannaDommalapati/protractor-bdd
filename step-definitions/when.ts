import { browser, protractor } from "protractor";
import { SearchPageObject } from "../pages/searchPage";
const { When } = require("cucumber");
/**
 * Created by Prasanna Dommalapati on 11/09/2018.
 */
const search: SearchPageObject = new SearchPageObject();

When(/^I type "(.*?)"$/, async (text) => {
    await search.searchTextBox.sendKeys(text);
});

When(/^I click on search button$/, async () => {
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
});