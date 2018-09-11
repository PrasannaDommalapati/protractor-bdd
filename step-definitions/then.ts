import { SearchPageObject } from "../pages/searchPage";
const { Then } = require("cucumber");
/**
 * Created by Prasanna Dommalapati on 11/09/2018.
 */
const search: SearchPageObject = new SearchPageObject();

Then(/^I clear the search text$/, async () => {
    await search.searchTextBox.clear();
});

Then(/^I click on google logo$/, async () => {
    await search.logo.click();
});
