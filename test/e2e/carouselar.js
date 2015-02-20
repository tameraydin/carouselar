describe('Carouselar Demo Page', function() {

  beforeEach(function() {
    browser.get('http://tamerayd.in/carouselar/');
  });

  it('should list images', function() {
    var imageList = element.all(by.repeater('image in images'));

    expect(imageList.count()).toEqual(17);
  });

  it('should display only 3 images', function() {
    expect(element.all(by.tagName('img')).count()).toEqual(3);
  });

  it('next & lazy load should work', function() {
    var nextButton = element.all(by.className('carouselar__navigation__button--next'));

    nextButton.click();
    expect(element.all(by.tagName('img')).count()).toEqual(6);
  });

  it('should be responsive', function() {
    var carouselar = element.all(by.className('carouselar__container'));
    var indexButtons = element.all(by.className('carouselar__navigation__button--index'));

    // landscape
    browser.manage().window().setSize(700, 480);
    carouselar.evaluate('displayingImageCount').then(function(count) {
      expect(count).toEqual([2]);
      expect(indexButtons.count()).toEqual(9);
    });

    // portrait
    browser.manage().window().setSize(480, 480);
    carouselar.evaluate('displayingImageCount').then(function(count) {
      expect(count).toEqual([1]);
      expect(indexButtons.count()).toEqual(17);
    });
  });
});
