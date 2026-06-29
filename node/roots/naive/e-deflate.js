import { eMultDouble2 as emd } from "big-float-ts";
import { eAdd as eae } from "big-float-ts";
/**
 * Deflates the given polynomial exactly by removing a factor (x - r).
 *
 * @param p a polynomial with coefficients given densely as an array of
 * floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param t an evaluation point of the polynomial (typically a root).
 *
 * @doc
 */
function eDeflate(p, t) {
    const d = p.length - 1;
    const bs = [p[0]];
    for (let i = 1; i < d; i++) {
        bs.push(
        // p[i] + root*bs[i-1]
        eae(p[i], emd(t, bs[i - 1])));
    }
    return bs;
}
export { eDeflate };
//# sourceMappingURL=e-deflate.js.map