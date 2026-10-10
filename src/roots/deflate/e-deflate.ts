import { eMultDouble2 as emd } from "big-float-ts";
import { eAdd as eae } from "big-float-ts";


/**
 * Deflates the given polynomial exactly by removing a factor (x - r).
 *
 * * returns `[]` (the zero polynomial) for a constant or the zero polynomial
 *
 * @param p a polynomial with coefficients given densely as an array of
 * floating point expansions from highest to lowest power,
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 * @param t an evaluation point of the polynomial (typically a root).
 *
 * @example
 * ```typescript
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2
 * eDeflate([[1], [-5], [8], [-4]], 2); //=> [[1], [-3], [2]]
 * ```
 *
 * @doc
 */
function eDeflate(p: number[][], t: number): number[][] {
    if (p.length <= 1) { return []; }

    const d = p.length-1;
    const bs = [p[0]];
    for (let i=1; i<d; i++) {
        bs.push(
            // p[i] + root*bs[i-1]
            eae(p[i],emd(t,bs[i-1]))
        );
    }

    return bs;
}


export { eDeflate }
