"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brent = void 0;
const eps = Number.EPSILON;
const abs = Math.abs;
const max = Math.max;
/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given function using Brent's Method. Any function can be supplied (it
 * does not even have to be continuous) as long as the root is bracketed.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method)
 *
 * * Brent's Method is an excellent root-refinement choice since:
 *   * guaranteed converge (unlike the Newton and other so-called single-point
 * methods),
 *   * converges in a reasonable number of iterations even for highly contrived
 * functions (unlike Dekker's Method) and
 *   * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 * Regula-Falsi methods).
 * * unfortunately the algorithm given on [Wikipedia](https://en.wikipedia.org/wiki/Brent%27s_method)
 * works but is not precisely Brent's method and runs about 2x or more slower
 * due to it not implementing the critically important 'micro-step' (Aug 2020).
 *
 * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
 *
 * * see [Brent (page 47)](https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf)
 *
 * @param f the function for which the root is sought.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 *
 * @example
 * ```typescript
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = t => Horner(p,t);
 * brent(f,2.2,3.8); //=> 3.000000000000003
 * brent(f,2.2,3.1); //=> 3.000000000000001
 * ```
 *
 * @doc
 */
function brent(f, lb, ub) {
    // Precondition: fa, fb !== 0
    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;
    let fa = f(a);
    let fb = f(b);
    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;
    while (true) {
        if (abs(fc) < abs(fb)) {
            a = b;
            b = c;
            c = a;
            fa = fb;
            fb = fc;
            fc = fa;
        }
        const δ = 2 * eps * max(1, abs(a), abs(b));
        const m = 0.5 * (c - b);
        //if (abs(m) <= δ || fb === 0) {
        if (abs(m) <= δ) {
            // uncomment below if range to be returned
            //return b < c ? [b,c] : [c,b];
            // uncomment below if leftmost guess to be returned
            //return b < c ? b : c;
            // uncomment below if rightmost guess to be returned
            //return b < c ? b : c;
            // uncomment below if any guess to be returned
            return b;
        }
        if (abs(e) < δ || abs(fa) <= abs(fb)) {
            e = m;
            d = e;
        }
        else {
            let s = fb / fa;
            let p;
            let q;
            if (a === c) {
                p = 2 * m * s;
                q = 1 - s;
            }
            else {
                q = fa / fc;
                const r = fb / fc;
                p = s * (2 * m * q * (q - r) - (b - a) * (r - 1));
                q = (q - 1) * (r - 1) * (s - 1);
            }
            if (0 < p) {
                q = -q;
            }
            else {
                p = -p;
            }
            s = e;
            e = d;
            if (2 * p < 3 * m * q - abs(δ * q) && p < abs(0.5 * s * q)) {
                d = p / q;
            }
            else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;
        if (δ < abs(d)) {
            b = b + d;
        }
        else if (0 < m) {
            b = b + δ;
        }
        else {
            //b = b - eps;
            b = b - δ;
        }
        fb = f(b);
        // inlined above line:
        //fb = p[0]; for (let i=1; i<p.length; i++) { fb = fb*b + p[i]; }
        if (fb === 0) {
            return b;
        }
        if (fb * fc > 0) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}
exports.brent = brent;
//# sourceMappingURL=brent.js.map