import { lsbExponent } from "big-float-ts";
import { multByPow2 } from "./mult-by-pow-2.js";
/**
 * Returns the result of scaling the given array of floats by the *same* power
 * of two such that all floats become bigints.
 *
 * * the result is exact (overflow cannot occur)
 * * subnormal numbers are handled correctly
 * * can be used to scale polynomials
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatsToBigints(as) {
    const n = as.length;
    const scalePowers = new Array(n); // (cached for the second pass)
    let e = -1024;
    for (let i = 0; i < n; i++) {
        const a = as[i];
        if (a === 0) {
            scalePowers[i] = 0;
            continue;
        }
        const scalePower = -lsbExponent(a);
        scalePowers[i] = scalePower;
        if (scalePower > e) {
            e = scalePower;
        }
    }
    // check for the trivial case
    if (e === 0) {
        return as.map(a => BigInt(a));
    }
    if (e > 0) {
        return as.map((a, i) => {
            if (a === 0) {
                return 0n;
            }
            const scalePower = scalePowers[i];
            // we first scale `a` to an (odd) integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(multByPow2(a, scalePower)) * 2n ** BigInt(e - scalePower);
        });
    }
    // overflow / underflow cannot occur
    return as.map(a => BigInt(a * 2 ** e));
}
export { scaleFloatsToBigints };
//# sourceMappingURL=scale-floats-to-bigints.js.map