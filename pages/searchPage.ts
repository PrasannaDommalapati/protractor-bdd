import {$, by, element, ElementFinder} from 'protractor';

export class SearchPageObject {
    public searchTextBox: ElementFinder;
    public searchButton: ElementFinder;
    public logo: ElementFinder;

    constructor() {
        this.searchTextBox = element(by.css('*[id=\'lst-ib\']'));
        this.searchButton  = $('input[value=\'Google Search\']');
        this.logo          = $('div#logocont');
    }
}
