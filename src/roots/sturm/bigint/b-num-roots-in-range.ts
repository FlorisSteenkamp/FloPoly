import { bSturmChain } from "../../../euclidean-division-related/bigint/b-sturm-chain.js";
import { bRemoveLeadingZeros } from "../../../basic/bigint/b-remove-leading-zeros.js";
import { bHorner } from "../../../evaluate/bigint/b-horner.js";
import { bSignChanges } from "./b-sign-changes.js";
import { bDeflate } from "../../deflate/b-deflate.js";


/**
 * Returns the *exact* number of *distinct* real roots in the **closed**
 * interval `[a,b]` of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * roots at the endpoints `a` and `b` are included in the count
 *
 * * returns `0` if `a > b` (the interval is empty)
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a a lower bound
 * @param b an upper bound
 *
 * @example
 * ```typescript
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRootsInRange(p,-20n,-11n);  //=> 0
 * bNumRootsInRange(p,-11n,-9n);   //=> 1
 * bNumRootsInRange(p,-11n,5n);    //=> 4
 * ```
 *
 * @doc
 */
function bNumRootsInRange(
        p: bigint[],
        a: bigint,
        b: bigint): number {

    if (a > b) {
        return 0;  // empty interval
    }

    p = bRemoveLeadingZeros(p);

    if (p.length === 0) {
        return Infinity;  // the zero polynomial
    }

    // Sturm's theorem requires that the endpoints are not multiple roots so
    // deflate all roots at the endpoints first and count them separately
    // (once each).

    // Check for a root at `a`
    let hasRootAtA = 0;
    while (p.length > 1 && bHorner(p,a) === 0n) {
        p = bDeflate(p, a);
        hasRootAtA = 1;
    }

    // Check for a root at `b`
    let hasRootAtB = 0;
    if (a !== b) {
        while (p.length > 1 && bHorner(p,b) === 0n) {
            p = bDeflate(p, b);
            hasRootAtB = 1;
        }
    }

    if (p.length === 1) {
        // a (possibly deflated) non-zero constant
        return hasRootAtA + hasRootAtB;
    }

    const ps = bSturmChain(p);
    const as = ps.map(p => bHorner(p,a));
    const bs = ps.map(p => bHorner(p,b));

    return bSignChanges(as) - bSignChanges(bs) + hasRootAtA + hasRootAtB;
}


export { bNumRootsInRange }
