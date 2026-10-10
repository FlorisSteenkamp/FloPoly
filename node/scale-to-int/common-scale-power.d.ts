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
declare function commonScalePower(as: number[]): number;
export { commonScalePower };
