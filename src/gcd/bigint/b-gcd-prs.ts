
import { bPremSequenceSubresultant as bPremSequenceSubresultant_ } from "../../euclidean-division-related/bigint/b-prem-sequence-subresultant";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bPremSequenceSubresultant = bPremSequenceSubresultant_;


/**
 * ❗ Use the modular gcd algorithm, `gcdModular`, instead - it is faster. ❗
 * 
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using 
 * Pseudo Remainder Sequences (PRSs) (bar overflow). The returned GCD is a
 * polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`.
 * 
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 */
function bGcdPrs(a: bigint[], b: bigint[]): bigint[] {
    if (a.length === 0) {
        return b;
    } else if (b.length === 0) {
        return a;
    }
    
    let seq = bPremSequenceSubresultant(a,b,false);

    return seq[seq.length-1];
}


export { bGcdPrs }
