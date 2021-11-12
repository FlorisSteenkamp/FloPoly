const abs = Math.abs;
const max = Math.max;
/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given function using the
 * [Bisection Method](https://en.wikipedia.org/wiki/Bisection_method) algorithm.
 *
 * * any function can be supplied (it does not even have to be continuous) as
 * long as the root is bracketed.
 *
 * * this function has no advantages above Brent's method except for its
 * simpler implementation and can be slower. Use [[brentPoly]] or [[brent]]
 * instead.
 *
 * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
 *
 * @param f the function for which the root is sought
 * @param a the lower limit of the search interval
 * @param b the upper limit of the search interval
 *
 * @example
 * ```typescript
 * const p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * const f = t => Horner(p,t);
 * bisection(f,2.2,3.8); //=> 3
 * bisection(f,2.2,3.1); //=> 3.0000000000000044
 * ```
 *
 * @doc
 */
function bisection(f, a, b) {
    if (b < a) {
        [a, b] = [b, a]; // Swap a and b 
    }
    const fa = f(a);
    const fb = f(b);
    if (a === b) {
        if (fa !== 0) {
            // Root is not bracketed - this is a precondition.
            throw new Error('Root not bracketed');
        }
        // the root is already found.
        return a;
    }
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
        const c = a + (b - a) / 2; // Take midpoint
        const fc = f(c);
        if (fc === 0) {
            return c;
        }
        if (fa * fc < 0) {
            b = c;
        }
        else {
            a = c;
        }
        const δ = 2 * Number.EPSILON * max(1, abs(a), abs(b));
        if (Math.abs(a - b) <= δ) {
            return b;
        }
    }
}
export { bisection };
//# sourceMappingURL=bisection.js.map