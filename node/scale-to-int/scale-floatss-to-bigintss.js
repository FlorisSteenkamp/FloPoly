import { lsbExponent } from "big-float-ts";
import { multByPow2 } from "./mult-by-pow-2.js";
/**
 * Returns the result of scaling the given array of array of floats by the
 * *same* power of two such that all floats become bigints.
 *
 * * the result is exact (overflow cannot occur)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials (with coefficients given as Shewchuk
 * expansions)
 *
 * @param ass an array of an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatssToBigintss(ass) {
    const scalePowerss = []; // (cached for the second pass)
    let e = -1024;
    for (let i = 0; i < ass.length; i++) {
        const c = ass[i];
        const scalePowers = new Array(c.length);
        scalePowerss.push(scalePowers);
        for (let j = 0; j < c.length; j++) {
            const a = c[j];
            if (a === 0) {
                scalePowers[j] = 0;
                continue;
            }
            const scalePower = -lsbExponent(a);
            scalePowers[j] = scalePower;
            if (scalePower > e) {
                e = scalePower;
            }
        }
    }
    // check for the trivial case
    if (e === 0) {
        return ass.map(as => as.map(a => BigInt(a)));
    }
    if (e > 0) {
        return ass.map((as, i) => as.map((a, j) => {
            if (a === 0) {
                return 0n;
            }
            const scalePower = scalePowerss[i][j];
            // we first scale `a` to an (odd) integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(multByPow2(a, scalePower)) * 2n ** BigInt(e - scalePower);
        }));
    }
    // overflow / underflow cannot occur
    return ass.map(as => as.map(a => BigInt(a * 2 ** e)));
}
export { scaleFloatssToBigintss };
//# sourceMappingURL=scale-floatss-to-bigintss.js.map