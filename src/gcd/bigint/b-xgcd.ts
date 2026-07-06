
/**
 * Returns the GCD of `a` and `p` together with Bezout coefficients `x` and `y`
 * such that `a*x + p*y = gcd(a,p)`.
 */
function bXgcd(
        a: bigint,
        p: bigint): { gcd: bigint; x: bigint; y: bigint; } {

    let oldR = a;
    let r = p;
    let oldS = 1n;
    let s = 0n;
    let oldT = 0n;
    let t = 1n;

    while (r !== 0n) {
        const q = oldR / r;

        [oldR, r] = [r, oldR - q*r];
        [oldS, s] = [s, oldS - q*s];
        [oldT, t] = [t, oldT - q*t];
    }

    return { gcd: oldR, x: oldS, y: oldT };
}


export { bXgcd }
