
import { bGcdInt } from "../../gcd/bigint/b-integer-gcd";


/**
 * Returns true if either polynomial is an exact rational multiple of the other.
 * 
 * @param a a polynomial with coefficients given densely as an array of 
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
function bIsRationalMultipleOf(a: bigint[], b: bigint[]): boolean {
    // If either polynomial is zero
    if (a.length === 0 || b.length === 0) { return true; }
    if (a.length !== b.length) { return false; }

    // multiply by -1 if appropriate to make the leading coefficients positive
    let a_ = a[0] < 0n ? a.map(c => -c) : a;
    let b_ = b[0] < 0n ? b.map(c => -c) : b;

    /** leading coefficient of a */
    let lcA = a_[0]; 
    /** leading coefficient of b */
    let lcB = b_[0]; 

    let gcd = bGcdInt(lcA, lcB);
    let A = lcA / gcd;  // this division is exact
    let B = lcB / gcd;  // this division is exact

    for (let i=0; i<a_.length; i++) {
        let Ab = A * b_[i];

        if (Ab % B !== 0n) { return false; }
        if (Ab / B !== a_[i]) { return false; }
    }

    return true;
}


export { bIsRationalMultipleOf }
