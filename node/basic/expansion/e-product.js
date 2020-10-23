"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eProduct = void 0;
const e_multiply_1 = require("./e-multiply");
/**
 * Returns the exact result (bar underflow / overflow) of the product of 0 or
 * more polynomials.
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param ps an array of polynomials each with coefficients given densely as an
 * array of Shewchuk floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 *
 * @example
 * eProduct([[[1],[2],[3]], [[2],[5],[3],[5]]]); //=> [[2], [9], [19], [26], [19], [15]]
 */
function eProduct(ps) {
    if (ps.length === 0) {
        return [[1]];
    }
    let p = ps[0];
    for (let i = 1; i < ps.length; i++) {
        p = e_multiply_1.eMultiply(p, ps[i]);
    }
    return p;
}
exports.eProduct = eProduct;
//# sourceMappingURL=e-product.js.map