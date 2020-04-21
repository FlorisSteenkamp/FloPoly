"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pseudo_remainder_1 = require("./pseudo-remainder");
const is_zero_1 = require("../basic/is-zero");
const degree_1 = require("../basic/degree");
const flo_numerical_1 = require("flo-numerical");
const is_const_1 = require("../basic/is-const");
/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 * see "The subresultant polynomial remainder sequence algorithm" by Ruiyuan (Ronnie) Chen, p.10
 * https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf
 * @param f a polynomial
 * @param g another polynomial
 * @param sturm if set to true then calculate a Sturm sequence instead
 */
function subresultantPseudoRemainderSequence(f, g, sturm) {
    let r = [f, g]; // Initialize the PRS
    let d = [degree_1.degree(f), degree_1.degree(g)];
    let a = [[1]]; // a_1 === 1
    let c = [[1]]; // c_1 === 1
    let i = 2;
    while (true) {
        a.push(r[i - 1][0]); // leading coefficient of r[i-1]
        let d_ = d[i - 2] - d[i - 1];
        let sgn = sturm
            ? -1
            : (d_ + 1) % 2 === 0 ? +1 : -1;
        let D = flo_numerical_1.expansionProduct(a[i - 2], flo_numerical_1.intPow(c[i - 2], d_));
        let exp = -d_ + 1;
        let cTerm1 = flo_numerical_1.intPow(a[i - 1], d_);
        let cTerm2 = flo_numerical_1.intPow(c[i - 2], Math.abs(exp));
        // TODO - surely exp >= 1 ??
        c.push(exp < 0
            ? flo_numerical_1.expansionDiv(cTerm1, cTerm2, 0)
            : flo_numerical_1.expansionProduct(cTerm1, cTerm2));
        let r_ = pseudo_remainder_1.prem(r[i - 2], r[i - 1], sturm).r
            .map(coeff => flo_numerical_1.expansionDiv(coeff, D, 0));
        r_ = sgn > 0 ? r_ : r_.map(flo_numerical_1.negativeOf);
        d.push(degree_1.degree(r_));
        if (is_zero_1.expIsZero(r_)) {
            return r;
        }
        r.push(r_);
        if (is_const_1.expIsConst(r_)) {
            // the remainder is a constant so the next remainder will be 0 anyway
            return r;
        }
        i++;
    }
}
exports.subresultantPseudoRemainderSequence = subresultantPseudoRemainderSequence;
//# sourceMappingURL=subresultant-pseudo-remainder-sequence.js.map