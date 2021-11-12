import { ePremSequenceSubresultant as ePremSequenceSubresultant_ } from "../../euclidean-division-related/expansion/e-prem-sequence-subresultant.js";import { ePremSequenceSubresultant as ePremSequenceSubresultant_ } from "../../euclidean-division-related/expansion/e-prem-sequence-subresultant.js
import { scaleFloatssToIntss as scaleFloatssToIntss_ } from "../../scale-to-int/scale-floatss-to-intss";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ePremSequenceSubresultant = ePremSequenceSubresultant_;
const scaleFloatssToIntss = scaleFloatssToIntss_;


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
 * Pseudo Remainder Sequences (PRSs) (bar overflow).
 * 
 * * if the polynomial coefficients are too large overflow can occur at
 * intermediate coefficient calculations
 * 
 * @param a a polynomial with coefficients given densely as an array of
 * Shewchuk expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * @param b another polynomial
 * 
 * @internal
 */
function eGcdPrs(a: number[][], b: number[][]): number[][] {
    const a_ = scaleFloatssToIntss(a);
    const b_ = scaleFloatssToIntss(b);

    if (a_.length === 0) {
        return b_;
    } else if (b_.length === 0) {
        return a_;
    }
    
    const seq = ePremSequenceSubresultant(a_,b_,false);

    return seq[seq.length-1];
}


//export { eGcdPrs }
