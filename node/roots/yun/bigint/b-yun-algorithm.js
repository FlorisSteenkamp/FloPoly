import { bDifferentiate } from "../../../calculus/bigint/b-differentiate.js";
import { bGcdPrs } from "../../../gcd/bigint/b-gcd-prs.js";
import { bPdivTrivial } from "../../../euclidean-division-related/bigint/b-pdiv-trivial.js";
import { bPrimitivePart } from "../../../factor/bigint/b-primitive-part.js";
import { bDivideByConst } from "../../../basic/bigint/b-divide-by-const.js";
import { bRemoveLeadingZeros } from "../../../basic/bigint/b-remove-leading-zeros.js";
function bExactDiv(a, b) {
    if (b.length === 0) {
        throw new Error('Cannot divide by the zero polynomial.');
    }
    const { q, r } = bPdivTrivial(a, b);
    if (r.length !== 0) {
        throw new Error('Expected exact polynomial division in bYunsAlgorithm.');
    }
    const d = a.length - b.length + 1;
    const multiplier = b[0] ** BigInt(d);
    for (const c of q) {
        if (c % multiplier !== 0n) {
            throw new Error('Pseudo quotient is not divisible by expected multiplier in bYunsAlgorithm.');
        }
    }
    return bRemoveLeadingZeros(bDivideByConst(q, multiplier));
}
function bGcdPrsSafe(a, b) {
    return a.length >= b.length
        ? bGcdPrs(a, b)
        : bGcdPrs(b, a);
}
/**
 * * see e.g. [Yun's algorithm](https://en.wikipedia.org/wiki/Square-free_polynomial)
 *
 * @param a polynomial with coefficients given densely as an array of bigints
 * from highest to lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`
 * @returns square-free factors paired with their multiplicities
 */
function bYunsAlgorithm(p) {
    p = bRemoveLeadingZeros(p);
    if (p.length <= 1) {
        return [];
    }
    // Yun's algorithm is defined on primitive polynomials over characteristic 0.
    p = bPrimitivePart(p);
    const pDiff = bDifferentiate(p);
    if (pDiff.length === 0) {
        return [];
    }
    const factors = [];
    let g = bPrimitivePart(bGcdPrsSafe(p, pDiff));
    let w = bExactDiv(p, g);
    let multiplicity = 1;
    while (w.length > 1) {
        const y = g.length <= 1
            ? [1n]
            : bPrimitivePart(bGcdPrsSafe(g, w));
        const factor = bExactDiv(w, y);
        if (factor.length > 1) {
            factors.push({ factor, multiplicity });
        }
        w = y;
        g = bExactDiv(g, y);
        multiplicity++;
    }
    return factors;
}
export { bYunsAlgorithm };
//# sourceMappingURL=b-yun-algorithm.js.map