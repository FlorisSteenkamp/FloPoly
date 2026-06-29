
const factorialCache: number[] = [
    1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800,
    39916800, 479001600, 6227020800, 87178291200, 1307674368000,
    20922789888000, 355687428096000, 6402373705728000
];

const len = factorialCache.length;


/**
 * Returns the factorial of the given number.
 * 
 * @param n 
 */
function factorial(n: number): number {
    if (n < len) { return factorialCache[n]; }
    if (n > 23) {
        throw new Error(`factorial(${n}) is too large to represent as a double (the limit is 23!).`);
    }
    return n * factorial(n - 1);
}


export { factorial }
