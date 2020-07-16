
import { evalK1MultiWithErrBounds } from "./evaluate/eval-k-multi-with-err-bounds";
import { HornerExact } from "./evaluate/horner-exact";


let eps = 2.220446049250313e-16;
let abs = Math.abs;

interface PsExact {
	ps: f64[][][]
};


/**
 * Exact, original Brent Dekker Method - modified slightly to allow for error 
 * bounds.
 * * returns a refined bound of max width 2*Number.EPSILON
 * * see https://people.sc.fsu.edu/~jburkardt/cpp_src/brent/brent.cpp
 * @param p 
 * @param pE 
 * @param a 
 * @param b 
 * @param fa 
 * @param fb 
 * @param psExact 
 * @param getPsExact 
 * @param diffCount 
 */
function refineMultiWithErrBounds(
		p: f64[][], 
		pE: f64[],
		lb: f64, 
		ub: f64,
		fa: f64,
		fb: f64,
		psExact: PsExact,
		getPsExact: () => f64[][][],
		diffCount: i32,
		δ = 2*eps): f64[] {

	// Precondition: fa, fb !== 0

	// from the c++ implementation
	// double c;
	// double d;
	// double e;
	// double fa;      --> given as input
	// double fb;      --> given as input
	// double fc;
	// double m;
	// double macheps; --> u
	// double p;
	// double q;
	// double r;
	// double s;
	// double sa;      --> a
	// double sb;      --> b
	// double tol;     --> fixed as Number.EPSILON (eps)


	/** true if we need to do precise evaluations, i.e. we are too close to a
	 * very tough root. */
	let exact = false;

	//---- Make local copies of a and b.
	let a = lb;
	let b = ub;

	let c = a;
	let fc = fa;
	let e = b - a;
	let d = e;

	let q = 0;

	while (true) {
		if (abs(fc) < abs(fb)) {
			a = b; b = c; c = a;
			fa = fb; fb = fc; fc = fa;
		}

		// Original c++ code had the line below but with us t === 0 and b is 
		// taken as 1 and 2.0 * macheps is taken as 2*u === Number.EPSILON (eps)
		// or can also be taken as 4*u === 2*Number.EPSILON (2*eps)
		//tol = 2.0 * macheps * abs ( b ) + t;
		let m = 0.5*(c - b);

		//if (abs(m) <= δ || fb === 0) {
		// modified from the original since we dont need the fb === 0 check here
		if (abs(m) <= δ) {
			//(window as any).qcount++;
			//(window as any).qtot += q;
			//console.log('a', Math.abs(b-c))
			return b < c ? [b,c] : [c,b];
		}

		q++;

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

		fb = exact 
			? HornerExact(psExact.ps[diffCount],b)
			: evalK1MultiWithErrBounds(p,pE,b).r̂;

		if (fb === 0) {
			// Since evalK1MultiWithErrBounds is approximate the zero result
			// cannot be fully trusted at this point.

			// if we are already doing exact evaluations this is an exact root
			if (exact) { 
				//(window as any).qcount++;
				//(window as any).qtot += q;
				//console.log('b', 0)
				return [b,b]; 
			}

			// We need to calculate δ/2 to the left and right of b to get 
			// results that should usually be !== 0. 
			// It is a pre-filter. If the result === 0 we need to sharpen the
			// ability of the evaluation by somehow reducing the error bound
			let sL = Math.max(lb, b - δ);  // dont overstep bounds
			let sR = Math.min(ub, b + δ);  // dont overstep bounds
			// Note: sR - sL <= 2*δ provided lb, ub are in [-1..1] - usually 
			// (when sL === s - δ and sR === s + δ) sR - sL === 2*δ. Also δ > 0
			let fsL = evalK1MultiWithErrBounds(p,pE,sL).r̂;
			let fsR = evalK1MultiWithErrBounds(p,pE,sR).r̂;
			// if the evaluation method is strong enough return the result
			if (fsL*fsR !== 0) { 
				//(window as any).qcount++;
				//(window as any).qtot += q;
				//console.log('c', sR-sL)
				return [sL,sR]; 
			}

			// At this point either fsL or fsR === 0 so we need to sharpen the
			// evaluation method
			exact = true;
			// get and cache the exact polynomial (we cache this since getting
			// the exact polynomial takes about 15 times more time than getting
			// the quad polynomial and we very rarely expect to get to this 
			// point)
			psExact.ps = psExact.ps || getPsExact();
			fb = HornerExact(psExact.ps[diffCount],b);
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


export { refineMultiWithErrBounds }
