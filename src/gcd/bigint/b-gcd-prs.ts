import { bPremSequenceSubresultant } from "../../euclidean-division-related/bigint/b-prem-sequence-subresultant.js";


/**
 * Returns the GCD (Greatest Common Divisor) of the two given polynomials using
 * Pseudo Remainder Sequences (PRSs).
 *
 * * the returned polynomial is the gcd up to a (non-zero) constant multiple,
 *   e.g. `[4n]` or `[3n,3n]` may be returned for a gcd of `1` or `x + 1`
 *   respectively - use [[bPrimitivePart]] to normalize it
 * 
 * * the modular GCD algorithm, [[bGcdModular]], can also be used; it should
 *   be faster for high degree polynomials or when `bGcdPrs` encounters pathological
 *   cases. However, `bGcdPrs` is faster in general.
 * 
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the 
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
 * 
 * @doc
 */
function bGcdPrs(a: bigint[], b: bigint[]): bigint[] {
    if (a.length === 0) {
        return b;
    } else if (b.length === 0) {
        return a;
    }

    // the pseudo remainder sequence requires `deg(a) >= deg(b)`
    if (a.length < b.length) {
        [a,b] = [b,a];
    }

    const seq = bPremSequenceSubresultant(a,b,false);

    return seq[seq.length-1];
}


export { bGcdPrs }
