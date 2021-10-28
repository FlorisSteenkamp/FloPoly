import { evalCertified as evalCertified_ } from "../../evaluate/double/eval-certified";
import { eHorner as eHorner_ } from "../../evaluate/expansion/e-horner";
import { eEstimate as eEstimate_ } from 'big-float-ts';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const evalCertified = evalCertified_;
const eHorner = eHorner_;
const eEstimate = eEstimate_;


const eps = Number.EPSILON;
const abs = Math.abs;
const max = Math.max;


/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the 
 * given polynomial using Brent's Method - modified slightly to allow for 
 * error certified bounds. 
 * 
 * * near exact implementation of the original Brent Dekker Method (also known 
 * as Brent's Method), except that it is specialzed to polynomial evaluation
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
 * * [c++ implementation of Brent's Method](https://people.sc.fsu.edu/~jburkardt/cpp_src/brent/brent.cpp)
 * 
 * @param p A polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]` 
 * represents the polynomial `5x^2 - 3x`. If `exact` is `true` then this is allowed
 * to be `undefined`.
 * @param pE An error polynomial that provides a coefficientwise error bound on 
 * the input polynomial; all coefficients must be positive. If `exact` is `true` 
 * then this is allowed to be `undefined`.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa the result of evaluating the input polynomial at `a`
 * @param fb the result of evaluating the input polynomial at `b`
 * @param psExact 
 * @param getPsExact 
 * @param diffCount 
 * @param exact set to true if you need to do exact evaluations from the start
 * 
 * @internal
 */
function refineCertified(
		p: number[][] | undefined, 
		pE: number[] | undefined,
		lb: number, 
		ub: number,
		fa: number,
		fb: number,
		getPolyExact: () => number[][],
		exact?: boolean): number[] {

	//---- Make local copies of a and b.
	let a = lb;
	let b = ub;

	let c = a;
	let fc = fa;
	let e = b - a;
	let d = e;

	while (true) {
		// update delta

		if (abs(fc) < abs(fb)) {
			a = b; b = c; c = a;
			fa = fb; fb = fc; fc = fa;
		}

		// Original c++ code had the line below but with us t === 0 and b is 
		// taken as 1 and 2.0 * macheps is taken as 2*u === Number.EPSILON (eps)
		// or can also be taken as 4*u === 2*Number.EPSILON (2*eps)

		// adaptive tolerance
		//let δ = 2 * eps * max(1,abs(b));
		//let δ = 2 * u * max(1,abs(b));
		let δ: number;
		const mm = max(abs(a),abs(b))
		if (mm <= 1) {
			δ = eps;
		} else {
			// keep δ = eps * a power of 2
			//δ = eps * 2**Math.ceil(Math.log2(Math.ceil(mm)));  // may be faster to get log2 of an integer
			δ = eps * 2**Math.ceil(Math.log2(mm)); 
		}
		//tol = 2.0 * macheps * abs ( b ) + t;
		const m = 0.5*(c - b);

		//if (abs(m) <= δ || fb === 0) {
		// modified from the original since we dont need the fb === 0 check here
		if (abs(m) <= δ) {
			// TODO - could potentially make b - c a power of 2 here δ
			return b < c ? [b,c] : [c,b];
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
				const r = fb / fc;
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

		fb = exact 
			? eEstimate(eHorner(getPolyExact(),b))
			// keep TypeScript happy; neither `p` nor `pE` can be `undefined` 
			// here by a precondition
			: evalCertified(p!, b, pE!);

		if (fb === 0) {
			// Since `evalCertified` returns zero if undecided the zero result
			// cannot be fully trusted at this point.

			// if we are already doing exact evaluations this is an exact root
			if (exact) { return [b,b]; }

			// We need to calculate δ/2 to the left and right of b to get 
			// results that should usually be !== 0. 
			// It is a pre-filter. If the result === 0 we need to sharpen the
			// ability of the evaluation by somehow reducing the error bound
			const sL = Math.max(lb, b - δ);  // dont overstep bounds
			const sR = Math.min(ub, b + δ);  // dont overstep bounds
			// Note: sR - sL <= 2*δ provided lb, ub are in [-1..1] - usually 
			// (when sL === s - δ and sR === s + δ) sR - sL === 2*δ. Also δ > 0
			// keep TypeScript happy; neither `p` nor `pE` can be `undefined` 
			// here by a precondition
			const fsL = evalCertified(p!, sL, pE!);
			const fsR = evalCertified(p!, sR, pE!);
			// if the evaluation method is strong enough return the result
			if (fsL*fsR !== 0) { 
				return [sL,sR]; 
			}

			// At this point either fsL or fsR === 0 so we need to sharpen the
			// evaluation method
			exact = true;
			// get and cache the exact polynomial (we cache this since getting
			// an exact polynomial takes about 15 times more time than getting
			// a double-double polynomial and we very rarely expect to get to 
			// this point)
			fb = eEstimate(eHorner(getPolyExact(),b));
			// if the exact evaluation returns 0 we have an exact root
			if (fb === 0) { 
				return [b,b]; 
			}
			// else we've got a new value for fb and from here on we use exact
			// evaluations
		}

		if ((0 < fb && 0 < fc) || (fb <= 0 && fc <= 0)) {
			c = a;
			fc = fa;
			e = b - a;
			d = e;
		}
	}
}


export { refineCertified }
