import { premSequenceSubresultant as premSequenceSubresultant_ } from "../../euclidean-division-related/double/prem-sequence-subresultant.js";
import { scaleFloatsToInts as scaleFloatsToInts_ } from "../../scale-to-int/scale-floats-to-ints";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const premSequenceSubresultant = premSequenceSubresultant_;
const scaleFloatsToInts = scaleFloatsToInts_;


// ❗❗❗❗❗❗
// THIS FUNCTION IS NOT EXPORTED AS IT IS IMPRACTICAL:
// INTERMEDIATE COEFFICIENT GROWTH CAUSES EVEN THE PRS COEFFICIENTS TO OVERFLOW
// USE `gcdModular` or `bGcdPrs` INSTEAD
// ❗❗❗❗❗❗


/**
 * ❗ Use the modular gcd algorithm, `gcdModular`, instead - it is faster and
 * is not subject to overflow (`bGcdPrs` is also not subject to overflow but
 * is slower). ❗
 * 
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using 
 * Pseudo Remainder Sequences (PRSs) (bar overflow). The returned GCD is a
 * polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`.
 * 
 * * if the polynomial coefficients are too large overflow can occur at
 * intermediate coefficient calculations
 * 
 * @param a a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 * 
 * @internal
 */
function gcdPrs(a: number[], b: number[]): number[][] {
    const a_ = scaleFloatsToInts(a);
    const b_ = scaleFloatsToInts(b);

    if (a_.length === 0) {
        return b_.map(c => [c]);
    } else if (b_.length === 0) {
        return a_.map(c => [c]);
    }

    const seq = premSequenceSubresultant(a_,b_,false);

    //console.log(seq)

    return seq[seq.length-1];
}


//export { gcdPrs }
