
import { Horner as Horner_ } from '../../evaluate/double/horner';

const Horner = Horner_;


const eps = Number.EPSILON;
const u = eps/2;
const abs = Math.abs;
const max = Math.max;


/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the 
 * given polynomial using Brent's Method. 
 * 
 * * near exact implementation of the original Brent Dekker Method (also known 
 * as Brent's Method), except that it is specialzed to polynomial evaluation
 * 
 * * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON/2 * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
 * 
 * * Brent's Method is an excellent root-refinement choice since:
 *  * guaranteed converge (unlike the Newton and other so-called single-point 
 * methods), 
 *  * converges in a reasonable number of iterations even for highly contrived 
 * functions (unlike Dekker's Method) and 
 *  * nearly always converges fast, i.e. super-linearly (unlike the Secant and 
 * Regula-Falsi methods).
 * * unfortunately the algorithm given on [Wikipedia](https://en.wikipedia.org/wiki/Brent%27s_method)
 * works but is not precisely Brent's method and runs about 2x or more slower 
 * due to it not implementing the critically important 'micro-step' (Aug 2020).
 * 
 * * see [Brent (page 47)](https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf)
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa (may be left out - will be calculated automatically) the result of 
 * evaluating the input polynomial at `a`
 * @param fb (may be left out - will be calculated automatically) the result of 
 * evaluating the input polynomial at `b`
 * 
 * @example
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let a = 2.2;
 * let b = 3.8;
 * brent(p,a,b); //=> 3.000000000000003
 * b = 3.1;
 * brent(p,a,b); //=> 3.000000000000001
 */
function brentPoly(
        p: number[], 
        lb: number, 
        ub: number,
        fa = Horner(p,lb),
        fb = Horner(p,ub)): number {

    // Precondition: fa, fb !== 0

    //---- Make local copies of a and b.
    let a = lb;
    let b = ub;

    let c = a;
    let fc = fa;
    let e = b - a;
    let d = e;

    while (true) {
        if (abs(fc) < abs(fb)) {
            a = b; b = c; c = a;
            fa = fb; fb = fc; fc = fa;
        }

        let δ = 2 * u * max(1,abs(a),abs(b));

        let m = 0.5*(c - b);

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
        } else {
            let s = fb / fa;
            let p: number;
            let q: number;
            if (a === c) {
                p = 2*m*s;
                q = 1 - s;
            } else {
                q = fa / fc;
                let r = fb / fc;
                p = s*(2*m*q*(q - r) - (b - a)*(r - 1));
                q = (q - 1)*(r - 1)*(s - 1);
            }

            if (0 < p) { q = -q; } else { p = -p; }

            s = e;
            e = d;

            if (2*p < 3*m*q - abs(δ*q) && p < abs(0.5*s*q)) {
                d = p / q;
            } else {
                e = m;
                d = e;
            }
        }
        a = b;
        fa = fb;

        if (δ < abs(d)) {
            b = b + d;
        } else if (0 < m) {
            b = b + δ;
        } else {
            //b = b - eps;
            b = b - δ;
        }

        fb = Horner(p,b);
        // inlined above line:
        //fb = p[0]; for (let i=1; i<p.length; i++) { fb = fb*b + p[i]; }

        if (fb === 0) {
            return b;
        }

        if (fb*fc > 0) {
            c = a;
            fc = fa;
            e = b - a;
            d = e;
        }
    }
}


export { brentPoly }
