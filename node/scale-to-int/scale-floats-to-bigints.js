import { exponent as exponent_ } from "big-float-ts";
import { bitLength as bitLength_ } from "big-float-ts";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const exponent = exponent_;
const bitLength = bitLength_;
const b0 = 0n; // so tests are not tripped up - awaiting better support
/**
 * Returns the result of scaling the given array of floats by the *same* power
 * of two such that all floats become bigints.
 *
 * * can be used to scale polynomials
 *
 * @param as an array of double precision floating point numbers
 *
 * @doc
 */
function scaleFloatsToBigints(as) {
    let e = -1024;
    for (let i = 0; i < as.length; i++) {
        const a = as[i];
        if (a === 0) {
            continue;
        }
        const scalePower = -exponent(a) + bitLength(a) - 1;
        if (scalePower > e) {
            e = scalePower;
        }
    }
    // check for the trivial case
    if (e === 0) {
        return as.map(a => BigInt(a));
    }
    if (e > 0) {
        return as.map(a => {
            if (a === 0) {
                return b0;
            }
            const scalePower = -exponent(a) + bitLength(a) - 1;
            // we first scale `a` to an integer without overflow and then
            // convert it to a bigint before multiplying
            return BigInt(a * 2 ** scalePower) * 2n ** BigInt(e - scalePower);
        });
    }
    // overflow / underflow cannot occur
    return as.map(a => BigInt(a * 2 ** e));
}
export { scaleFloatsToBigints };
//# sourceMappingURL=scale-floats-to-bigints.js.map