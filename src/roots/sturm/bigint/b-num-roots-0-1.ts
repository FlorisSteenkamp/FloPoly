import { bSturmChain } from "../../../euclidean-division-related/bigint/b-sturm-chain.js";
import { bRemoveLeadingZeros } from "../../../basic/bigint/b-remove-leading-zeros.js";
import { bSignChanges } from "./b-sign-changes.js";
import { bEvaluateAt1 } from "../../../evaluate/bigint/b-evaluate-at-1.js";
import { bDeflate } from "../../deflate/b-deflate.js";


/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[0,1]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root in `[0,1]`, namely `1`.
 *
 * * roots at the endpoints `0` and `1` are included in the count
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * bNumRootsIn01([1n, -4n, 5n, -2n]);  //=> 1  (the roots are 1 (double) and 2)
 * bNumRootsIn01([1n, 0n, 0n]);        //=> 1  (a double root at 0)
 * ```
 *
 * @doc
 */
function bNumRootsIn01(
        p: bigint[]): number {

    p = bRemoveLeadingZeros(p);

    if (p.length === 0) {
        return Infinity;  // the zero polynomial
    }

    // Sturm's theorem requires that the endpoints are not multiple roots so
    // deflate all roots at the endpoints first and count them separately
    // (once each).

    // Check for a root at 0
    let hasRootAt0 = 0;
    while (p.length > 1 && p[p.length-1] === 0n) {
        p = p.slice(0, p.length - 1);
        hasRootAt0 = 1;
    }

    // Check for a root at 1
    let hasRootAt1 = 0;
    while (p.length > 1 && bEvaluateAt1(p) === 0n) {
        p = bDeflate(p, 1n);
        hasRootAt1 = 1;
    }

    if (p.length === 1) {
        // a (possibly deflated) non-zero constant
        return hasRootAt0 + hasRootAt1;
    }

    const ps = bSturmChain(p);
    const as = ps.map(p => p[p.length-1]);    // evaluate at 0
    const bs = ps.map(p => bEvaluateAt1(p));  // evaluate at 1

    return bSignChanges(as) - bSignChanges(bs) + hasRootAt0 + hasRootAt1;
}


export { bNumRootsIn01 }
