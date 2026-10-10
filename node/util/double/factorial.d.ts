/**
 * Returns the factorial of the given number.
 *
 * * the result is exact for `n <= 18` (`18! < 2^53`); for `18 < n <= 23` the
 *   result is rounded to double precision and for `n > 23` an error is thrown
 *
 * @param n
 */
declare function factorial(n: number): number;
export { factorial };
