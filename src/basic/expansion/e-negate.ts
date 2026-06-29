import { eNegativeOf } from "big-float-ts";


/**
 * Returns the negative of the given polynomial (with coefficients given as 
 * Shewchuk floating point expansions), i.e. (p -> -p).
 * 
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]` 
 * represents the polynomial `5x^2 - 3x`
 * 
 * @example
 * ```typescript
 * eNegate([[0.1], [-0.2]]); //=> [[-0.1], [0.2]]
 * ```
 * 
 * @doc
 */
function eNegate(p: number[][]): number[][] {
    const result = new Array<number[]>(p.length);
    for (let i=0; i<p.length; i++) {
        result[i] = eNegativeOf(p[i]);
    }
    return result;
}


export { eNegate }
