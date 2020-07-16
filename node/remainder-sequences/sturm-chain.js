"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sturmChainExact = exports.sturmChain = void 0;
const differentiate_1 = require("../calculus/differentiate");
const multiply_1 = require("../basic/multiply");
const multiply_by_const_1 = require("../basic/multiply-by-const");
const subtract_1 = require("../basic/subtract");
const subresultant_pseudo_remainder_sequence_1 = require("./subresultant-pseudo-remainder-sequence");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const differentiate = differentiate_1.differentiate;
const differentiateExact = differentiate_1.differentiateExact;
const multiply = multiply_1.multiply;
const multiplyByConst = multiply_by_const_1.multiplyByConst;
const subtract = subtract_1.subtract;
const subresultantPseudoRemainderSequence = subresultant_pseudo_remainder_sequence_1.subresultantPseudoRemainderSequence;
/**
 * Returns an exact Sturm chain for the given polynomial using pseudo remainders.
 * * https://en.wikipedia.org/wiki/Sturm%27s_theorem
 * * https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param p a polynomial
 * @example
 * sturmChain([[-3],[4],[2],[-2]]);
 */
function sturmChainExact(p) {
    let dp = differentiateExact(p);
    return subresultantPseudoRemainderSequence(p, dp, true);
}
exports.sturmChainExact = sturmChainExact;
/**
 * Returns an approximate Sturm chain for the given polynomial.
 * See https://en.wikipedia.org/wiki/Sturm%27s_theorem
 * @param p a polynomial
 * @example
 * sturmChain([-3,4,2,-2]); //=> [[-3, 4, 2, -2], [-9, 8, 2], [-2.5185185185185186, 1.7037037037037037], [-3.2932525951557086]]
 */
function sturmChain(p) {
    /**
     * Returns the negative of the remainder when dividing the first
     * polynomial (the dividend) by the second (the divisor) provided
     * that deg(p1) - deg(p2) === 1.
     * @private
     * @param p1 The first polynomial (dividend)
     * @param p2 The second polynomial (divisor)
     * See https://en.wikipedia.org/wiki/Sturm%27s_theorem
     */
    function negRemainder(p1, p2) {
        let a = p1[1] / p1[0] - p2[1] / p2[0];
        let b = p1[0] / p2[0];
        let p3 = multiply(multiplyByConst(b, p2), [1, a]);
        return subtract(p3, p1);
    }
    let m = []; // Sturm chain
    m.push(p);
    m.push(differentiate(p));
    let i = 1;
    while (m[i].length - 1 > 0) {
        let pnext = negRemainder(m[i - 1], m[i]);
        // If the polynomial degree was not reduced due to roundoff
        // such that the first 1 or more terms are very small.
        while (m[i].length - pnext.length < 1) {
            pnext.shift();
        }
        m.push(pnext);
        i++;
    }
    return m;
}
exports.sturmChain = sturmChain;
//# sourceMappingURL=sturm-chain.js.map