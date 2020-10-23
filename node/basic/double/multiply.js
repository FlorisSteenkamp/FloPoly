"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = void 0;
const remove_leading_zeros_1 = require("./remove-leading-zeros");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const removeLeadingZeros = remove_leading_zeros_1.removeLeadingZeros;
/**
 * Returns the result of multiplying 2 polynomials in double precision.
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param p1 a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param p2 another polynomial.
 * @example
 * multiply([1,2,3], [2,5,3,5]); //=> [2, 9, 19, 26, 19, 15]
 */
function multiply(p1, p2) {
    const d1 = p1.length - 1;
    const d2 = p2.length - 1;
    // if either or both is the zero polynomial
    if (d1 < 0 || d2 < 0) {
        return [];
    }
    const d = d1 + d2;
    const r = new Array(d + 1).fill(0);
    for (let i = 0; i < d1 + 1; i++) {
        for (let j = 0; j < d2 + 1; j++) {
            r[d - (i + j)] += (p1[d1 - i] * p2[d2 - j]);
        }
    }
    return removeLeadingZeros(r);
}
exports.multiply = multiply;
//# sourceMappingURL=multiply.js.map