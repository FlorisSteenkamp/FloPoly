/**
 * Returns the GCD of `a` and `p` together with Bezout coefficients `x` and `y`
 * such that `a*x + p*y = gcd(a,p)`.
 */
declare function bXgcd(a: bigint, p: bigint): {
    gcd: bigint;
    x: bigint;
    y: bigint;
};
export { bXgcd };
