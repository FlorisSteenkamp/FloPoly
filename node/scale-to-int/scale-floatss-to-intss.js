import { lsbExponent } from "big-float-ts";
import { multByPow2 } from "./mult-by-pow-2.js";
/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become integers (bar overflow).
 *
 * * the result is exact (no round-off can occur, but overflow can if the
 *   magnitudes of the given floats differ too much - use [[scaleFloatssToBigintss]]
 *   if this is a concern)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatssToIntss(ass) {
    let e = -1024;
    for (let i = 0; i < ass.length; i++) {
        const c = ass[i];
        for (let j = 0; j < c.length; j++) {
            const a = c[j];
            if (a === 0) {
                continue;
            }
            const scalePower = -lsbExponent(a);
            if (scalePower > e) {
                e = scalePower;
            }
        }
    }
    return ass.map(as => as.map(a => multByPow2(a, e)));
}
export { scaleFloatssToIntss };
//# sourceMappingURL=scale-floatss-to-intss.js.map