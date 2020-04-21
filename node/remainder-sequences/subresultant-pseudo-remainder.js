"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pseudo_remainder_1 = require("./pseudo-remainder");
const degree_1 = require("../basic/degree");
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the subresultant pseudo remainder of a/b.
 * see "The subresultant polynomial remainder sequence algorithm" by Ruiyuan (Ronnie) Chen, p.10
 * https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf
 * @param f a polynomial
 * @param g another polynomial
  */
function sprem(f, g) {
    let r = [f, g]; // Initialize the PRS
    let d = [degree_1.degree(f), degree_1.degree(g)];
    let a = [[1]]; // a_1 === 1
    let c = [[1]]; // c_1 === 1
    let i = 2;
    a.push(r[i - 1][0]); // leading coefficient of r[i-1]
    let d_ = d[i - 2] - d[i - 1];
    let sgn = (d_ + 1) % 2 === 0 ? +1 : -1;
    let D = flo_numerical_1.expansionProduct(a[i - 2], flo_numerical_1.intPow(c[i - 2], d_));
    let exp = -d_ + 1;
    let cTerm1 = flo_numerical_1.intPow(a[i - 1], d_);
    let cTerm2 = flo_numerical_1.intPow(c[i - 2], Math.abs(exp));
    c.push(exp < 0
        ? flo_numerical_1.expansionDiv(cTerm1, cTerm2, 0)
        : flo_numerical_1.expansionProduct(cTerm1, cTerm2));
    let res = pseudo_remainder_1.prem(r[i - 2], r[i - 1]);
    let r_ = {
        q: res.q.map(coeff => flo_numerical_1.expansionDiv(coeff, D, 0)),
        r: res.r.map(coeff => flo_numerical_1.expansionDiv(coeff, D, 0))
    };
    return r_;
}
exports.sprem = sprem;
//# sourceMappingURL=subresultant-pseudo-remainder.js.map