import { bSturmChain } from "../../../euclidean-division-related/bigint/b-sturm-chain.js";
import { bDegree } from "../../../basic/bigint/b-degree.js";
import { bRemoveLeadingZeros } from "../../../basic/bigint/b-remove-leading-zeros.js";
import { bSignChanges } from "./b-sign-changes.js";


/**
 * Returns the *exact* number of *distinct* real roots in the interval `(-∞,+∞)`
 * of the given polynomial.
 *
 * * roots with multiplicity are counted only once, e.g. the polynomial `(x - 1)^3`
 *   has exactly one distinct real root, namely `1`.
 *
 * * returns `0` for a non-zero constant polynomial and `Infinity` for the
 *   zero polynomial (which has infinitely many roots)
 *
 * @param p a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * const p = [1n, 1n, -64n, 236n, -240n];
 * bNumRoots(p); //=> 4
 * ```
 *
 * @doc
 */
function bNumRoots(
        p: bigint[]): number {

    p = bRemoveLeadingZeros(p);

    if (p.length === 0) {
        return Infinity;  // the zero polynomial
    }
    if (p.length === 1) {
        return 0;  // a non-zero constant
    }

    const ps = bSturmChain(p);
    const as = ps.map(p => bDegree(p) % 2 === 0 ? p[0] : -p[0]);
    const bs = ps.map(p => p[0]);

    return bSignChanges(as) - bSignChanges(bs);
}


export { bNumRoots }
