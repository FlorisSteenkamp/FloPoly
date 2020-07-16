"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bisection = void 0;
/**
 * Searches an interval (a,b) for a root (i.e. zero) of the
 * given function with respect to its first argument using the Bisection
 * Method root-finding algorithm. Any function can be supplied (it does
 * not even have to be continuous) as long as the root is bracketed.
 *
 * Note: This function has no advantages above the Brent method except
 * for its simpler implementation and can be much slower. Use brent
 * instead.
 * @param f the function for which the root is sought.
 * @param a the lower limit of the search interval.
 * @param b the upper limit of the search interval.
 * @example
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = evaluate(p);
 * bisection(f,2.2,3.8); //=> 3
 * bisection(f,2.2,3.1); //=> 3.0000000000000044
 */
function bisection(f, a, b) {
    if (a === b) {
        // Presumably the root is already found.
        return a;
    }
    else if (b < a) {
        [a, b] = [b, a]; // Swap a and b 
    }
    let fa = f(a);
    let fb = f(b);
    if (fa === 0) {
        return a;
    }
    if (fb === 0) {
        return b;
    }
    if (fa * fb > 0) {
        // Root is not bracketed - this is a precondition.
        throw new Error('Root not bracketed');
    }
    while (true) {
        let c = a + (b - a) / 2; // Take midpoint
        let fc = f(c);
        if (fc === 0) {
            return c;
        }
        if (fa * fc < 0) {
            b = c;
        }
        else {
            a = c;
        }
        // We don't add Number.EPSILON in the line below because we want
        // accuracy to improve even below 1.
        let δ = 2 * Number.EPSILON * Math.abs(b) /*+ Number.EPSILON*/;
        if (Math.abs(a - b) <= δ) {
            return b;
        }
    }
}
exports.bisection = bisection;
//# sourceMappingURL=bisection.js.map