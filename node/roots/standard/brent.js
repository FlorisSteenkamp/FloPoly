"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Searches an interval (a,b) for a root (i.e. zero) of the
 * given function with respect to its first argument using the Brent's
 * Method root-finding algorithm. Any function can be supplied (it does
 * not even have to be continuous) as long as the root is bracketed.
 *
 * Brent's Method is an excellent root-finding choice since:
 * * guaranteed to converge (unlike the Newton and other so-called
 * single-point methods),
 * * converges in a reasonable number of iterations even for highly contrived
 * functions (unlike Dekker's Method) and
 * * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 * Regula-Falsi methods).
 *
 * The max error, δ, is set equal to 2*Number.EPSILON*Math.abs(b)
 * after each iteration where b is the max of the current 2 best
 * guesses.
 *
 * See https://en.wikipedia.org/wiki/Brent%27s_method
 * See Brent (page 47) https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf
 * @param f the function for which the root is sought.
 * @param a the lower limit of the search interval.
 * @param b the upper limit of the search interval.
 * @example
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = evaluate(p);
 * brent(f,2.2,3.8); //=> 3.000000000000003
 * brent(f,2.2,3.1); //=> 3.000000000000001
 */
function brent(f, a, b) {
    if (a === b) {
        // Presumably the root is already found.
        return a;
    }
    // We assume on the first iteration f(a) !== 0 && f(b) !== 0. 
    let fa = f(a);
    let fb = f(b);
    if (fa * fb > 0) {
        // Root is not bracketed - this is a precondition.
        throw new Error('Root not bracketed');
    }
    let c; // Value of previous guess - set to a initially 
    if (Math.abs(fa) < Math.abs(fb)) {
        // Swap a,b
        c = a;
        a = b;
        b = c;
        // Swap fa,fb
        let temp = fa;
        fa = fb;
        fb = temp;
    }
    c = a;
    let mflag = true;
    let d; // Value of guess before previous guess
    while (true) {
        let δ = 2 * Number.EPSILON * Math.abs(b); // + Number.EPSILON;
        let fc = f(c);
        // Calculate provisional interpolation value
        let s;
        if (fa !== fc && fb !== fc) {
            // 3 points available - inverse quadratic interpolation
            let fac = fa - fc;
            let fab = fa - fb;
            let fbc = fb - fc;
            // The below has been multiplied out to speed up the algorithm.
            /*s = ((a * fb * fc) / ( fab * fac)) +
                  ((b * fa * fc) / (-fab * fbc)) +
                  ((c * fa * fb) / ( fac * fbc));*/
            s = ((a * fb * fbc - b * fa * fac) * fc + c * fa * fab * fb) / (fab * fac * fbc);
        }
        else {
            // only 2 points available - secant method
            s = b - (fb * ((b - a) / (fb - fa)));
        }
        let t1 = (3 * a + b) / 4;
        let b_c = Math.abs(b - c);
        let s_b = Math.abs(s - b);
        let c_d = Math.abs(c - d); // c_d will not be used on first iteration
        if ((!( // condition 1
        (s > t1 && s < b) ||
            (s < t1 && s > b))) ||
            (mflag && (
            // condition 2
            (s_b >= b_c / 2) ||
                // condition 4
                (b_c < δ))) ||
            (!mflag && (
            // condition 3
            (s_b >= c_d / 2) ||
                // condition 5
                (c_d < δ)))) {
            // Bisection
            s = (a + b) / 2;
            mflag = true;
        }
        else {
            mflag = false;
        }
        let fs = f(s);
        d = c;
        c = b;
        if (fa * fs < 0) {
            b = s;
        }
        else {
            a = s;
        }
        if (Math.abs(fa) < Math.abs(fb)) {
            // Swap a,b
            let temp = a;
            a = b;
            b = temp;
        }
        if (fb === 0) {
            return b;
        }
        if (fs === 0) {
            return s;
        }
        if (Math.abs(a - b) <= δ) {
            return b;
        }
        fa = f(a);
        fb = f(b);
    }
}
exports.brent = brent;
//# sourceMappingURL=brent.js.map