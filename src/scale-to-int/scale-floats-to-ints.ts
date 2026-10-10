import { lsbExponent } from "big-float-ts";
import { multByPow2 } from "./mult-by-pow-2.js";


/**
 * Returns the result of scaling the given floats by the *same* power of two
 * such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can if the
 *   magnitudes of the given floats differ too much - use [[scaleFloatsToBigints]]
 *   if this is a concern)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials or Shewchuk expansions
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatsToInts(as: number[]): number[] {
    let e = -1024;
    for (let i=0; i<as.length; i++) {
        const a = as[i];
        if (a === 0) { continue; }
        const scalePower = -lsbExponent(a);
        if (scalePower > e) {
            e = scalePower;
        }
    }

    return as.map(a => multByPow2(a, e));
}


export { scaleFloatsToInts }
