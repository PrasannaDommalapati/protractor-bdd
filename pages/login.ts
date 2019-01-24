import {$, ElementFinder} from 'protractor';

export class LoginPageObject {
    public username: ElementFinder;
    public password: ElementFinder;
    public loginBtn: ElementFinder;

    constructor() {
        this.username = $('input#loginEmail');
        this.password = $('input#loginPassword');
        this.loginBtn = $(`button[type='submit']`);
    }

}
