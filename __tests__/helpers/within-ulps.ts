
const { sign, abs } = Math;


/**
 * Returns `true` if `b` is within the given number of ULPs (units in the last
 * place) of `a`, `false` otherwise.
 * 
 * @param a 
 * @param b 
 * @param ulps 
 */
function withinUlps(
        a: number,
        b: number,
        ulps: number): boolean {

    if (a === b) {
        return true;
    }

    if (sign(a) !== sign(b)) {
        return false;
    }

    const _a = abs(a);
    const _b = abs(b);

    return abs(_a - _b)/_a <= ulps * Number.EPSILON;
}


function allWithinUlps(
        a: number[],
        b: number[],
        ulps: number): boolean {

    if (a.length !== b.length) {
        return false;
    }

    for (let i=0; i<a.length; i++) {
        if (!withinUlps(a[i], b[i], ulps)) {
            return false;
        }
    }

    return true;
}


// withinUlps(1, 1 + Number.EPSILON, 1); //?
// withinUlps(1, 1 + 2*Number.EPSILON, 1); //?
// withinUlps(1, 1 + 8*Number.EPSILON, 9); //?
// withinUlps(10, 10.000000000000001, 1); //?

export { withinUlps, allWithinUlps }
