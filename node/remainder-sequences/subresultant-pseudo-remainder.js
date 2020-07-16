"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sprem = void 0;
//import { expansionProduct, eIntPow, eDiv } from "big-float-ts";
const big_float_ts_1 = require("big-float-ts");
const pseudo_remainder_1 = require("./pseudo-remainder");
const degree_1 = require("../basic/degree");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const prem = pseudo_remainder_1.prem;
const degree = degree_1.degree;
const { expansionProduct, eIntPow, eDiv } = big_float_ts_1.operators;
/**
 * Returns the subresultant pseudo remainder of a/b.
 * see "The subresultant polynomial remainder sequence algorithm" by Ruiyuan (Ronnie) Chen, p.10
 * https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf
 * @param f a polynomial
 * @param g another polynomial
  */
function sprem(f, g) {
    let r = [f, g]; // Initialize the PRS
    let d = [degree(f), degree(g)];
    let a = [[1]]; // a_1 === 1
    let c = [[1]]; // c_1 === 1
    let i = 2;
    a.push(r[i - 1][0]); // leading coefficient of r[i-1]
    let d_ = d[i - 2] - d[i - 1];
    let sgn = (d_ + 1) % 2 === 0 ? +1 : -1;
    let D = expansionProduct(a[i - 2], eIntPow(c[i - 2], d_));
    let exp = -d_ + 1;
    let cTerm1 = eIntPow(a[i - 1], d_);
    let cTerm2 = eIntPow(c[i - 2], Math.abs(exp));
    c.push(exp < 0
        ? eDiv(cTerm1, cTerm2, 0)
        : expansionProduct(cTerm1, cTerm2));
    let res = prem(r[i - 2], r[i - 1]);
    let r_ = {
        q: res.q.map(coeff => eDiv(coeff, D, 0)),
        r: res.r.map(coeff => eDiv(coeff, D, 0))
    };
    return r_;
}
exports.sprem = sprem;
//# sourceMappingURL=subresultant-pseudo-remainder.js.map