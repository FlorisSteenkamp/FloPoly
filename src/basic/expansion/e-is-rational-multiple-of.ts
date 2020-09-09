
import { scaleFloatsToInts } from "../../scale-to-int/scale-floats-to-ints";
import { gcdInt } from "../../gcd/double/integer-gcd";
import { twoProduct, eLongDivide, eSign, eCompare, eNegativeOf, eIntDiv, expansionProduct } from "big-float-ts";
import { scaleFloatssToIntss } from "../../scale-to-int/scale-floatss-to-intss";
import { eGcdInt } from "../../gcd/expansion/e-integer-gcd";


/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 * 
 * @param a a polynomial with coefficients given densely as an array of 
 * Shewchuk expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
function eIsRationalMultipleOf(a: number[][], b: number[][]): boolean {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) { return true; }
    if (a.length !== b.length) { return false; }

    // multiply by -1 if appropriate to make the leading coefficients positive
    let a_ = eSign(a[0]) < 0 ? a.map(c => eNegativeOf(c)) : a;
    let b_ = eSign(b[0]) < 0 ? b.map(c => eNegativeOf(c)) : b;

    // scale floating point coefficients to integers
    a_ = scaleFloatssToIntss(a_);
    b_ = scaleFloatssToIntss(b_);

    /** leading coefficient of a */
    let lcA = a_[0]; 
    /** leading coefficient of b */
    let lcB = b_[0]; 

    let gcd = eGcdInt(lcA, lcB);
    let A = eIntDiv(lcA, gcd);  // this division is exact
    let B = eIntDiv(lcB, gcd);  // this division is exact

    for (let i=0; i<a_.length; i++) {
        let Ab = expansionProduct(A, b_[i]);

        let { div, rem } = eLongDivide(Ab,B);

        if (eSign(rem) !== 0) { return false; }
        if (eCompare(div, a_[i]) !== 0) { return false; }
    }

    return true;
}


export { eIsRationalMultipleOf }
