# Carouselar

- ~4kb
- Responsive
- Lazy Loading

## Usage

Install Carouselar via [Bower](http://bower.io):
```bash
bower install carouselar
```

Include main files:
```html
<link rel="stylesheet" href="bower_components/carouselar/dist/carouselar.min.css">
<script src="bower_components/carouselar/dist/carouselar.min.js"></script>
```

Include Carouselar as a dependency in your Angular application:
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
2. ``npm install``
2. ``bower install``
3. Run ``gulp watch`` and open [http://localhost:8080/demo/index.html](http://localhost:8080/demo/index.html)
5. Use ``gulp test-unit`` or ``gulp test-e2e`` to execute your tests
6. Finally, be sure that selenium driver is up: ``webdriver-manager start`` and run ``gulp build``

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)
