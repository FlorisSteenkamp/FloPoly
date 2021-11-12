import { eLongDivide, eSign, eCompare, eNegativeOf, eIntDiv, expansionProduct } from "big-float-ts";
import { scaleFloatssToIntss } from "../../scale-to-int/scale-floatss-to-intss.js";import { scaleFloatssToIntss } from "../../scale-to-int/scale-floatss-to-intss.js
import { eGcdInt } from "../../gcd/expansion/e-integer-gcd";


/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 * 
 * @param a a polynomial with coefficients given densely as an array of 
 * Shewchuk expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 * 
 * @doc
 */
function eIsRationalMultipleOf(a: number[][], b: number[][]): boolean {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) { return true; }
    if (a.length !== b.length) { return false; }

    // multiply by -1 if appropriate to make the leading coefficients positive
    // then scale floating point coefficients to integers
    const a_ = scaleFloatssToIntss(eSign(a[0]) < 0 ? a.map(c => eNegativeOf(c)) : a);
    const b_ = scaleFloatssToIntss(eSign(b[0]) < 0 ? b.map(c => eNegativeOf(c)) : b);

    /** leading coefficient of a */
    const lcA = a_[0]; 
    /** leading coefficient of b */
    const lcB = b_[0]; 

    const gcd = eGcdInt(lcA, lcB);
    const A = eIntDiv(lcA, gcd);  // this division is exact
    const B = eIntDiv(lcB, gcd);  // this division is exact

    for (let i=0; i<a_.length; i++) {
        const Ab = expansionProduct(A, b_[i]);

        const { div, rem } = eLongDivide(Ab,B);

        if (eSign(rem) !== 0) { return false; }
        if (eCompare(div, a_[i]) !== 0) { return false; }
    }

    return true;
}


export { eIsRationalMultipleOf }
