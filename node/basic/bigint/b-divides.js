import { bPdivTrivial } from "../../euclidean-division-related/bigint/b-pdiv-trivial.js";
/**
 * Returns `true` if the polynomial `b` divides the polynomial `a`, i.e. if
 * there exists a polynomial `r` such that `a = b*r`.
 *
 * @param a a polynomial with coefficients given densely as an array of
 * bigints from highest to lowest power, e.g. `[5n,-3n,0n]` represents the
 * polynomial `5x^2 - 3x`
 * @param b another polynomial
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
// Quokka tests
// import { bMultiply } from "./b-multiply.js";
// const a = bMultiply([1n,1n],[1n,-1n]);//?
// const { r } = bPdivTrivial([1n, 0n, -1n], [6n, -6n]);//?
// bDivides([4n, 0n, -4n], [2n,2n]);//?
//# sourceMappingURL=b-divides.js.map