import { lsbExponent } from "big-float-ts";
/**
 * Returns the (smallest) power of two, `e`, such that `a*2**e` is an integer
 * for *every* given float `a` - this is the power used by
 * [[scaleFloatsToBigints]], [[scaleFloatsToInts]], etc.
 *
 * * returns `0` if all the given floats are zero
 *
 * @param as an array of double precision floating point numbers
 *
 * @internal
 */
function commonScalePower(as) {
    let e = -Infinity;
    for (let i = 0; i < as.length; i++) {
        const a = as[i];
        if (a === 0) {
            continue;
        }
        const scalePower = -lsbExponent(a);
        if (scalePower > e) {
            e = scalePower;
        }
    }
    return e === -Infinity ? 0 : e;
}
export { commonScalePower };
//# sourceMappingURL=common-scale-power.js.map