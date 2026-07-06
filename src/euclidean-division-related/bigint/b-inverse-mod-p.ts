
/**
 * Returns the multiplicative inverse of `a` modulo `p`.
 * 
 * * see also the function `bXgcd`
 */
function bInverseModP(
        a: bigint,
        p: bigint): bigint {

    let oldR = a;
    let r = p;
    let oldS = 1n;
    let s = 0n;

    while (r !== 0n) {
        const q = oldR / r;

        [oldR, r] = [r, oldR - q*r];
        [oldS, s] = [s, oldS - q*s];
    }

    return oldS;
}


export { bInverseModP }


// Quokka tests
// bInverseModP(3n, 11n);//?