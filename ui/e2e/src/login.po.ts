import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  hasLoginWrapper() {
    return element(by.css('div.login-wrapper')).isPresent() as Promise<boolean>;
  }
}
