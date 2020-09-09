
import { expansionProduct as expansionProduct_ } from "big-float-ts";
import { eIntPow as eIntPow_ } from "big-float-ts";
import { eDiv as eDiv_ } from "big-float-ts";
import { eNegativeOf as eNegativeOf_ } from "big-float-ts";
import { eIsConstOrZero as eIsConstOrZero_ } from "../../basic/expansion/e-is-const-or-zero";
import { eDegree as eDegree_ } from "../../basic/expansion/e-degree";
import { ePdivTrivial as ePdivTrivial_ } from "./e-pdiv-trivial";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ePdivTrivial = ePdivTrivial_;
const eIsConstOrZero = eIsConstOrZero_;
const expansionProduct = expansionProduct_;
const eIntPow = eIntPow_;
const eDiv = eDiv_;
const eNegativeOf = eNegativeOf_;
const eDegree = eDegree_;


/**
 * Returns the subresultant pseudo remainder sequence of a/b.
 * 
 * * **precondition:** g !== [], i.e. unequal to the zero polynomial.
 * 
 * * **precondition:** the coefficients must integer Shewchuk floating point 
 * expansions; if they are not they can easily be scaled from 
 * floating point numbers to Shewchuk expansions by calling `scaleFloatsToInts` 
 * or similar before calling this function (recall that all floating point 
 * numbers are rational).
 * 
 * * Intermediate calculations (and the input coefficients) are done in 
 * infinite precision up to overlow (meaning integers can be represented 
 * *exactly* up to `2^1024 === 1797...(300 more digits)...37216`) and may 
 * thus not be applicable to very high degree polynomials (in which case it is 
 * better to use `bPremSequenceSubresultant`)
 * 
 * * see [*The subresultant polynomial remainder sequence algorithm* by Ruiyuan (Ronnie) Chen, p.10](https://pdfs.semanticscholar.org/2e6b/95ba84e2160748ba8fc310cdc408fc9bbade.pdf)
 * 
 * @param f the polynomial a in the formula a = bq + r; the polynomial is given
 * with coefficients as a dense array of integer Shewchuk expansions from 
 * highest to lowest power, e.g. `[[5],[-3],[0]]` represents the 
 * polynomial `5x^2 - 3x`
 * @param g the polynomial b in the formula a = bq + r
 * @param sturm if set to true then calculate a Sturm sequence instead
 */
function ePremSequenceSubresultant(
        f: number[][], 
        g: number[][], 
        sturm = false): number[][][] {

    let r = [f,g]; // Initialize the PRS
    let d = [eDegree(f), eDegree(g)];
    let a = [[1]]; // a_1 === 1
    let c = [[1]]; // c_1 === 1
    let i = 2;

    while (true) {
        a.push(r[i-1][0]); // leading coefficient of r[i-1]
        let d_ = d[i-2] - d[i-1];
        let sgn = sturm
            ? -1
            : (d_+1) % 2 === 0 ? +1 : -1;
        let D = expansionProduct(a[i-2], eIntPow(c[i-2], d_));
        let exp = -d_+1;
        let cTerm1 = eIntPow(a[i-1], d_);
        let cTerm2 = eIntPow(c[i-2], Math.abs(exp));

        c.push(exp < 0 
            ? eDiv(cTerm1, cTerm2, 0)
            : expansionProduct(cTerm1, cTerm2)
        );
        let r_ = ePdivTrivial(r[i-2], r[i-1], sturm).r
            .map(coeff => eDiv(coeff, D, 0));
        r_ = sgn > 0 ? r_ : r_.map(eNegativeOf);
        d.push(eDegree(r_));

        if (r_.length === 0) { 
            return r; 
        } 

        r.push(r_);

        if (eIsConstOrZero(r_)) {
            // the remainder is a constant so the next remainder 
            // will be 0 anyway
            return r;
        }
        
        i++;
    }
}


export { ePremSequenceSubresultant }
