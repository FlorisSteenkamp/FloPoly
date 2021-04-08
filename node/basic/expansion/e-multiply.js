"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eMultiply = void 0;
const e_remove_leading_zeros_1 = require("./e-remove-leading-zeros");
const big_float_ts_1 = require("big-float-ts");
const big_float_ts_2 = require("big-float-ts");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eRemoveLeadingZeros = e_remove_leading_zeros_1.eRemoveLeadingZeros;
const expansionProduct = big_float_ts_1.expansionProduct;
const fastExpansionSum = big_float_ts_2.fastExpansionSum;
/**
 * Returns the exact result (bar underflow / overflow) of multiplying two
 * polynomials (with coefficients given as Shewchuk floating point expansions).
 *
 * * see [polynomial arithmetic](https://en.wikipedia.org/wiki/Polynomial_arithmetic)
 * * see [polynomial multiplication](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication)
 * * see [polynomial multiplication](http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf)
 *
 * @param a a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param b another polynomial.
 *
 * @example
 * ```typescript
 * eMultiply([[1],[2],[3]], [[2],[5],[3],[5]]); //=> [[2], [9], [19], [26], [19], [15]]
 * ```
 *
 * @doc
 */
function eMultiply(a, b) {
    const da = a.length - 1;
    const db = b.length - 1;
    // if either or both is the zero polynomial
    if (da < 0 || db < 0) {
        return [];
    }
    const d = da + db;
    const result = new Array(d + 1).fill([0]);
    for (let i = 0; i < da + 1; i++) {
        for (let j = 0; j < db + 1; j++) {
            result[d - (i + j)] = fastExpansionSum(result[d - (i + j)], expansionProduct(a[da - i], b[db - j]));
        }
    }
    return eRemoveLeadingZeros(result);
}
exports.eMultiply = eMultiply;
//# sourceMappingURL=e-multiply.js.map