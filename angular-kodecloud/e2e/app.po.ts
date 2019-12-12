import { browser, element, by } from 'protractor';
import { StringDecoder } from 'string_decoder';

export class PocYamlPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

StringDecodersdds