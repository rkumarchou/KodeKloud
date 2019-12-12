import { PocYamlPage } from './app.po';

describe('angular-kodecloud App', function () {
  let page: PocYamlPage;

  beforeEach(() => {
    page = new PocYamlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
