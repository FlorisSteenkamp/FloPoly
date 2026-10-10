import { EFTHorner } from "./eft-horner.js";
/**
 * Applies the error-free transformation `EFTHorner` recursively to a depth of
 * `K - 1` and returns the `2**(K-1) - 1` internal node results (`hs`) and the
 * `2**(K-1)` leaf polynomials (`ps`) that still need to be evaluated.
 *
 * * **precondition:** `1 <= K <= p.length`
 *
 * @param p
 * @param x
 * @param K
 *
 * @internal
 */
function EFTHornerK(p, x, K) {
    const ps = [p];
    const hs = [];
    const numInternal = 2 ** (K - 1) - 1; // number of internal nodes of the tree
    for (let i = 0; i < numInternal; i++) {
        const { r̂, pπ, pσ } = EFTHorner(ps[i], x);
        hs.push(r̂);
        ps.push(pπ);
        ps.push(pσ);
    }
    // the leaves are the last `2**(K-1)` polynomials
    return { hs, ps: ps.slice(numInternal) };
}
export { EFTHornerK };
//# sourceMappingURL=eft-horner-k.js.map