"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove_leading_zeros_1 = require("./remove-leading-zeros");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the approximate result of multiplying 2 polynomials.
 * * See polynomial arithmetic https://en.wikipedia.org/wiki/Polynomial_arithmetic
 * * See polynomial multiplication https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication
 * * See polynomial multiplication http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf
 * @param p1 a polynomial.
 * @param p2 another polynomial.
 * @example
 * multiply([1,2,3], [2,5,3,5]); //=> [2, 9, 19, 26, 19, 15]
 */
function multiply(p1, p2) {
    let d1 = p1.length - 1;
    let d2 = p2.length - 1;
    let d = d1 + d2;
    let result = new Array(d + 1).fill(0);
    for (let i = 0; i < d1 + 1; i++) {
        for (let j = 0; j < d2 + 1; j++) {
            result[d - (i + j)] += (p1[d1 - i] * p2[d2 - j]);
        }
    }
    return remove_leading_zeros_1.removeLeadingZeros(result);
}
exports.multiply = multiply;
/**
 * Returns the exact result of multiplying 1 or more polynomials.
 * * See polynomial arithmetic https://en.wikipedia.org/wiki/Polynomial_arithmetic
 * * See polynomial multiplication https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication
 * * See polynomial multiplication http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf
 * @param p1 a polynomial.
 * @param p2 another polynomial.
 * @example
 * multiply([[1],[2],[3]], [[2],[5],[3],[5]]); //=> [[2], [9], [19], [26], [19], [15]]
 */
function multiplyExact_(p1, p2) {
    let d1 = p1.length - 1;
    let d2 = p2.length - 1;
    let d = d1 + d2;
    let result = new Array(d + 1).fill([0]);
    for (let i = 0; i < d1 + 1; i++) {
        for (let j = 0; j < d2 + 1; j++) {
            result[d - (i + j)] = flo_numerical_1.fastExpansionSum(result[d - (i + j)], flo_numerical_1.expansionProduct(p1[d1 - i], p2[d2 - j]));
        }
    }
    return remove_leading_zeros_1.expRemoveLeadingZeros(result);
}
/**
 * Returns the exact result of multiplying 1 or more polynomials.
 * * See polynomial arithmetic https://en.wikipedia.org/wiki/Polynomial_arithmetic
 * * See polynomial multiplication https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication
 * * See polynomial multiplication http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf
 * @param p1 a polynomial.
 * @param p2 another polynomial.
 * @example
 * multiply([[1],[2],[3]], [[2],[5],[3],[5]]); //=> [[2], [9], [19], [26], [19], [15]]
 */
function multiplyExact(ps) {
    if (ps.length === 1) {
        return ps[0];
    }
    let p = ps[0];
    for (let i = 1; i < ps.length; i++) {
        p = multiplyExact_(p, ps[i]);
    }
    return p;
}
exports.multiplyExact = multiplyExact;
//# sourceMappingURL=multiply.js.map