[![Coverage Status](https://coveralls.io/repos/github/FlorisSteenkamp/FloPoly/badge.svg?branch=master)](https://coveralls.io/github/FlorisSteenkamp/FloPoly?branch=master)
[![Build Status](https://travis-ci.org/FlorisSteenkamp/FloPoly.svg?branch=master)](https://travis-ci.org/FlorisSteenkamp/FloPoly)

The focus is to find real polynomial roots from degree 2 (quadratic) up to about degree 20 as
accurately and as fast as possible, e.g.  
```javascript
FloPoly.allRoots([1, -21, 175, -735, 1624, -1764, 720]); //=> [0.9999999999999997, 2.0000000000000013, 2.9999999999999316, 4.000000000000096, 5.000000000000012, 6.000000000000028]
```

# Documentation, Benchmarks and more
Please visit [the site](http://mat-demo.appspot.com/#!/test-polynomials).

# Installation and Usage

## Node (or the browser if you use [Browserify](http://browserify.org)) 

```cli
npm install flo-poly
```

```javascript
var Poly = require("flo-poly");
```

## Browser

```cli
npm install flo-poly
```

Include the script in your project:
```html
<script src='node_modules/flo-poly/browser/index.min.js'></script>
```

After having included the script file in your HTML there will be a new global 
viariable available called `FloPoly` that represents the library. See the 
[docs](http://mat-demo.appspot.com/#!/test-polynomials#docs).


