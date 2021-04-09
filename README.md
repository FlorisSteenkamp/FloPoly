[![Coverage Status](https://coveralls.io/repos/github/FlorisSteenkamp/FloPoly/badge.svg?branch=master)](https://coveralls.io/github/FlorisSteenkamp/FloPoly?branch=master)
[![Build Status](https://travis-ci.org/FlorisSteenkamp/FloPoly.svg?branch=master)](https://travis-ci.org/FlorisSteenkamp/FloPoly)

The focus is to find real roots of real coefficient polynomials from degree 1 up to about degree 20 as
accurately and as fast as possible, e.g.  
```typescript
// some polynomial with double precision coefficients, i.e. x^6 - 21x^5 + 175x^4 - 735x^3 + 1624x^2 - 1764 + 720
const p = [1, -21, 175, -735, 1624, -1764, 720];  
allRoots(p); //=> [0.9999999999999997, 2.0000000000000013, 2.9999999999999316, 4.00000000000096, 5.000000000000012, 6.00000000000028]
```

However, the above function, `allRoots`, does not take error bounds into account and
can thus be inaccurate if the roots have high condition numbers.

For extremely accurate (no matter how high the condition number) certified results use e.g.:

```typescript
const p = [1, -21, 175, -735, 1624, -1764, 720];  // some polynomial with double precision coefficients
allRootsCertifiedSimplified(p);
```

or for a more flexible function that takes the input polynomial coefficients 
as double-double precision and the ability to specify error bounds on the coefficients
in addition to a fallback function to specify exact coefficients 
(in the form of [Shewchuk expansions](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)) 
use `allRootsCertified`.

Though the focus is on root finding, the library include numerous useful operators
on polynomials with `double`, `double-double`, `Shewchuk expansion` and `bigint` coefficients, e.g

```typescript
add([1,2,3], [3,4]); //=> [1,5,7]
```

## Why only up to about degree 20?
This isn't a hard limit. Roughly speaking, since the roots are found 
using [Rolle's Theorem](https://en.wikipedia.org/wiki/Rolle%27s_theorem) 
it becomes asymptotically slower (compared to [Descartes Methods](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)), i.e. 
roughly `O(n²)` vs `O(n)` the higher the polynomial degree, `n`.

Another reason is that evaluation of the polynomial at `x` when `|x| >> 1` can result in
overflow when the result is larger than about `1.8 x 10^308` (the max value a double precision floating point value can be).


# Documentation
For more in-depth documentation please [read the docs!](https://florissteenkamp.github.io/FloPoly).

# Installation

```cli
npm install flo-poly
```

In TypeScript or Node simply import whatever you need, e.g.:
```typescript
import { allRoots } from 'flo-poly';
```

or if you prefer using a script and global var in the browser (not recommended):
```html
<script src='node_modules/flo-poly/browser/index.min.js'></script>
```

and then use the global named `FloPoly`

```javascript
const { allRoots } = FloPoly;
// ...
```

