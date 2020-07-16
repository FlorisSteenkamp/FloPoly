"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subresultantPseudoRemainderSequence = void 0;
//import { expansionProduct, eIntPow, eDiv, eNegativeOf } from "big-float-ts";
const big_float_ts_1 = require("big-float-ts");
const pseudo_remainder_1 = require("./pseudo-remainder");
const is_zero_1 = require("../basic/is-zero");
const degree_1 = require("../basic/degree");
const is_const_1 = require("../basic/is-const");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const prem = pseudo_remainder_1.prem;
const degree = degree_1.degree;
const expIsZero = is_zero_1.expIsZero;
const expIsConst = is_const_1.expIsConst;
const { expansionProduct, eIntPow, eDiv, eNegativeOf } = big_float_ts_1.operators;
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
    let d = [degree(f), degree(g)];
    let a = [[1]]; // a_1 === 1
    let c = [[1]]; // c_1 === 1
    let i = 2;
    while (true) {
        a.push(r[i - 1][0]); // leading coefficient of r[i-1]
        let d_ = d[i - 2] - d[i - 1];
        let sgn = sturm
            ? -1
            : (d_ + 1) % 2 === 0 ? +1 : -1;
        let D = expansionProduct(a[i - 2], eIntPow(c[i - 2], d_));
        let exp = -d_ + 1;
        let cTerm1 = eIntPow(a[i - 1], d_);
        let cTerm2 = eIntPow(c[i - 2], Math.abs(exp));
        // TODO - surely exp >= 1 ??
        c.push(exp < 0
            ? eDiv(cTerm1, cTerm2, 0)
            : expansionProduct(cTerm1, cTerm2));
        let r_ = prem(r[i - 2], r[i - 1], sturm).r
            .map(coeff => eDiv(coeff, D, 0));
        r_ = sgn > 0 ? r_ : r_.map(eNegativeOf);
        d.push(degree(r_));
        if (expIsZero(r_)) {
            return r;
        }
        r.push(r_);
        if (expIsConst(r_)) {
            // the remainder is a constant so the next remainder will be 0 anyway
            return r;
        }
        i++;
    }
}
exports.subresultantPseudoRemainderSequence = subresultantPseudoRemainderSequence;
//# sourceMappingURL=subresultant-pseudo-remainder-sequence.js.map