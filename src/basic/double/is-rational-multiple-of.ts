import { scaleFloatsToInts } from "../../scale-to-int/scale-floats-to-ints.js";
import { gcdInt } from "../../gcd/double/integer-gcd.js";
import { twoProduct, eLongDivide, eSign, eCompare } from "big-float-ts";


/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 * 
 * @param a a polynomial with coefficients given densely as an array of 
 * double precision floating point numbers from highest to lowest power, 
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 * 
 * @doc
 */
function isRationalMultipleOf(a: number[], b: number[]): boolean {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) { return true; }
    if (a.length !== b.length) { return false; }

    // multiply by -1 if appropriate to make the leading coefficients positive
    // then scale floating point coefficients to integers
    const a_ = scaleFloatsToInts(a[0] < 0 ? a.map(c => -c) : a);
    const b_ = scaleFloatsToInts(b[0] < 0 ? b.map(c => -c) : b);

    /** leading coefficient of a */
    const lcA = a_[0]; 
    /** leading coefficient of b */
    const lcB = b_[0]; 

    const gcd = gcdInt(lcA, lcB);
    const A = lcA / gcd;  // this division is exact
    const B = lcB / gcd;  // this division is exact

    for (let i=0; i<a_.length; i++) {
        const Ab = twoProduct(A, b_[i]);

        const { div, rem } = eLongDivide(Ab,[B]);

        if (eSign(rem) !== 0) { return false; }
        if (eCompare(div, [a_[i]]) !== 0) { return false; }
    }

    return true;
}


export { isRationalMultipleOf }
