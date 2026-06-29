
const factorialCache: bigint[] = [
    1n, 1n, 2n, 6n, 24n, 120n, 720n, 5040n, 40320n, 362880n, 3628800n,
    39916800n, 479001600n, 6227020800n, 87178291200n, 1307674368000n,
    20922789888000n, 355687428096000n, 6402373705728000n
];

const len = factorialCache.length;


/**
 * Returns the factorial of the given number.
 * 
 * @param n 
 */
function bFactorial(n: number): bigint {
    if (n < len) { return factorialCache[n]; }
    return BigInt(n) * bFactorial(n - 1);
}


export { bFactorial }


// Quokka tests
// bFactorial(0);//?
// bFactorial(17);//?
// bFactorial(18);//?
// bFactorial(19);//?
// bFactorial(20);//?
// bFactorial(50);//?