
const factorialCache: number[] = [
    1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800,
    39916800, 479001600, 6227020800, 87178291200, 1307674368000,
    20922789888000, 355687428096000, 6402373705728000
];

const len = factorialCache.length;


/**
 * Returns the factorial of the given number.
 *
 * * the result is exact for `n <= 18` (`18! < 2^53`); for `18 < n <= 23` the
 *   result is rounded to double precision and for `n > 23` an error is thrown
 *
 * @param n
 */
function factorial(n: number): number {
    if (n < len) { return factorialCache[n]; }
    if (n > 23) {
        throw new Error(`factorial(${n}) is not supported (the limit is 23!; results are only exact up to 18!).`);
    }
    return n * factorial(n - 1);
}


export { factorial }
