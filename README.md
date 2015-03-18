# Carouselar [![Build Status](http://img.shields.io/travis/tameraydin/carouselar/master.svg?style=flat-square)](https://travis-ci.org/tameraydin/carouselar) [![Code Climate](http://img.shields.io/codeclimate/github/tameraydin/carouselar.svg?style=flat-square)](https://codeclimate.com/github/tameraydin/carouselar/dist/carouselar.js) [![Coverage Status](https://img.shields.io/coveralls/tameraydin/carouselar/master.svg?style=flat-square)](https://coveralls.io/r/tameraydin/carouselar?branch=master)

[Demo](http://tamerayd.in/carouselar/)

- ~4kb
- CSS Transitions
- Responsive
- Lazy Loading

## Usage

Install Carouselar via [Bower](http://bower.io):
```bash
bower install carouselar --production
```

Include main files:
```html
<link rel="stylesheet" href="bower_components/carouselar/dist/carouselar.min.css">
<script src="bower_components/carouselar/dist/carouselar.min.js"></script>
```

Include ``carouselar`` module as a dependency into your app:
```javascript
angular
  .module('yourApp', [
    'carouselar'
  ]);
```

Place ``carouselar`` element into your HTML with basic parameters:
```html
<carouselar 
  displaying-image-count="2" 
  images="['img1.png', 'img2.png', 'img3.png']" />
<!-- you would rather use a scope variable to provide images -->
```

## Development

1. Clone the repo or [download](https://github.com/tameraydin/carouselar/archive/master.zip).
2. ``npm install && bower install``
3. Run ``gulp watch`` and open [http://localhost:8080/demo/index.html](http://localhost:8080/demo/index.html)
4. Use ``gulp test-unit`` or ``gulp test-e2e`` to execute your tests
5. Finally, be sure that selenium driver is up: ``webdriver-manager start`` and run ``gulp build``

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)
