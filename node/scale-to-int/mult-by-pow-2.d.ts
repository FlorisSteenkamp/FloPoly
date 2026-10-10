/**
 * Returns `a * 2**e` exactly (bar overflow / underflow of the *result*) even
 * when `2**e` itself is not representable (i.e. `e > 1023`).
 *
 * @param a a double precision floating point number
 * @param e an integer power
 *
 * @internal
 */
declare function multByPow2(a: number, e: number): number;
export { multByPow2 };
