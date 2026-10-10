import { bPdivTrivial } from "../../euclidean-division-related/bigint/b-pdiv-trivial.js";
/**
 * Returns `true` if the polynomial `b` divides the polynomial `a` (over the
 * integers), i.e. if there exists a polynomial `r` (with integer
 * coefficients) such that `a = b*r`.
 *
 * * **note** the parameter order: the divisor `b` comes first
 *
 * @param b the divisor; a polynomial with coefficients given densely as an
 * array of bigints from highest to lowest power, e.g. `[5n,-3n,0n]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the dividend; another polynomial
 *
 * @example
 * ```typescript
 * bDivides([2n,2n], [4n,0n,-4n]);  //=> true   (2x + 2 divides 4x^2 - 4)
 * bDivides([4n,0n,-4n], [2n,2n]);  //=> false
 * ```
 *
 * @doc
 */
function bDivides(b, a) {
    if (b.length === 0) {
        return a.length === 0;
    }
    if (a.length === 0) {
        return false;
    }
    const { q, r } = bPdivTrivial(a, b);
    if (r.length !== 0) {
        return false;
    }
    const d = a.length - b.length + 1;
    const multiplier = b[0] ** BigInt(d);
    for (const c of q) {
        if (c % multiplier !== 0n) {
            return false;
        }
    }
    return true;
}
export { bDivides };
//# sourceMappingURL=b-divides.js.map