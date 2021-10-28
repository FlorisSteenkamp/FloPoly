import { eDifferentiate as eDifferentiate_ } from '../src/calculus/expansion/e-differentiate';
import { eHorner as eHorner_ } from "../src/evaluate/expansion/e-horner";
import { transposePoly as transposePoly_ } from "../src/roots/certified/transpose-poly";
import { refineCertified as refineCertified_ } from "../src/roots/certified/refine-certified";
import { eEstimate as eEstimate_, eSign as _eSign } from "big-float-ts";
import { negativeRootLowerBound_LMQ as negativeRootUpperBound_LMQ_ } from "../src/roots/root-bounds/root-bounds-lmq";
import { positiveRootUpperBound_LMQ as positiveRootUpperBound_LMQ_ } from "../src/roots/root-bounds/root-bounds-lmq";
import { hornerWithRunningError as hornerWithRunningError_ } from "../src/evaluate/double/horner-with-running-error";
import { RootInterval } from "../src/roots/certified/root-interval";
//import { toCasStr } from "../../basic/to-cas-str";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eHorner = eHorner_;
const transposePoly = transposePoly_;
const negativeRootUpperBound_LMQ = negativeRootUpperBound_LMQ_;
const positiveRootUpperBound_LMQ = positiveRootUpperBound_LMQ_;
const eDifferentiate = eDifferentiate_;
const eEstimate = eEstimate_;
const hornerWithRunningError = hornerWithRunningError_;
const eSign = _eSign;


const max = Math.max;
const min = Math.min;
const abs = Math.abs;
const eps = Number.EPSILON;
const onePlusEps = 1 + eps;


// TODO - should this be included in new version?? this function has Shewchuk coefficients from the start
// TODO - improve docs
// TODO - note: returns `undefined` for infinite number of roots
/**
 * Finds and returns all *certified* root intervals (bar underflow / overflow) 
 * of the given polynomial (with coefficients given as Shewchuck expansions.
 * 
 * @param p exact polynomial
 * 
 * @doc
 */
function eAllRootsCertified(
		p: number[][],
		lb = 0,
		ub = 1): RootInterval[] {

	if (p.length === 0) {
        // return undefined for the zero polynomial
		return undefined;
	}
    if (p.length === 1) {
        if (eSign(p[0]) === 0) {
            // return undefined for the zero polynomial
            return undefined;
        }

        // return `[]` for a degree 1 polynomial (a non-zero constant)
        return [];
    }

	if (lb === Number.NEGATIVE_INFINITY || ub === Number.POSITIVE_INFINITY) {
		const pDoubleCoeffs = p.map(c => c[1]);

		if (lb === Number.NEGATIVE_INFINITY) {
			lb = negativeRootUpperBound_LMQ(pDoubleCoeffs);
		}
		
		if (ub === Number.POSITIVE_INFINITY) {
			ub = positiveRootUpperBound_LMQ(pDoubleCoeffs);
		}
	}

	//const δ = 2*Number.EPSILON * max(1, max(abs(lb), abs(ub)));

	const deg = p.length-1;

	let poly = p.slice();
	// Get all derivatives, i.e. 
	// ps === [p, dp, ddp, ..., constant]
    const psExact = [poly];
	const psExact_ = [transposePoly(poly)]; // the transposed versions
    for (let i=1; i<=deg; i++) {
        poly = eDifferentiate(poly);
        psExact.push(poly);
		psExact_.push(transposePoly(poly)); // the transposed versions
    }

	let LB: number;  // evaluation at lb
	do {
		LB = eEstimate(eHorner(p, lb));
		if (LB === 0) {
			lb -= 2*Number.EPSILON * max(1, abs(lb));
		}
	} while (LB === 0);
		
	let UB: number;  // evaluation at ub
	do {
		UB = eEstimate(eHorner(p, ub));
		if (UB === 0) {
			ub += 2*Number.EPSILON * max(1, abs(ub));
		}
	} while (UB === 0);


	let is: RootInterval[] = [];
	let diffCount = deg-1;
	let curP_: number[][];
	for (; diffCount>=0; diffCount--) {
		// on first iteration p_ is linear, on second it is quadratic, etc. ...
		curP_ = psExact_[diffCount];

		is = getRootsWithin();
	}

	return is;


	// All cases:
	// ----------
	// Note: [_a,a_] denotes a micro-interval, whereas [b_,_a], [a_,_b] denotes a
	// normal interval.
	// Note: In all iterations we check [_a,a_] and [a_,_b]. In the final
	// iteration we check [_b,b_], then we've checked all intervals.
	// 
	// ⇑ represents +pos (above x-axis) and ⇓ represents -neg
	// (the symmetric cases also applies where + and - are interchanged)
	// ? means does not matter
	// -----------------------------------------------------------------

	// CASE 1A:
	// _A⇑ | A_⇑ | _B⇑
	//  - [_a,a_] → 
	//    - _a === a_
	//        ? no root 
	//        : A_/_A close enough to zero
	//            ? close even root 
	//            : no roots
	//  - [a_,_b] → no root (curve is monotone increasing or decreasing)

	// CASE 1B:
	// _A⇑ | A_⇑ | _B⇓  
	//  - [_a,a_] → 
	//    - _a === a_
	//        ? no root 
	//        : A_/_A close enough to zero ? close even root : no roots
	//  - [a_,_b] → single root (curve is monotone increasing or decreasing)

	// CASE 2A:
	// _A⇑ | A_⇓ | _B⇑
	//  - [_a,a_] → odd root(s)
	//  - [a_,_b] → single root (curve is monotone increasing or decreasing)

	// CASE 2B:
	// _A⇑ | A_⇓ | _B⇓
	//  - [_a,a_] → odd root(s)
	//  - [a_,_b] → no root (curve is monotone increasing or decreasing)


	// CASE 3A: 
	// A_0 | A_? | _B? | B_?  

	// CASE 3B: 
	// A_? | A_0 | _B? | B_?  


	/**
	 * Finds and returns all roots of the given polynomial within the given 
	 * intervals, starting from the lower bound (lb) and ending at the upper
	 * bound (ub) as fetched from the closure.
	 * 
	 * * **precondition** intervals should be disjoint, i.e endpoints are not allowed 
	 * to be equal - it must be that a_ !== _b
	 * * **precondition** the curve must be monotone increasing or decreasing between 
	 * b_ and _a AND a_ and _b
	 * * **precondition** the value at the lower bound (LB) and upper bound (UB)
	 * must !== 0
	 * 
	 * @internal
	 * 
	 * @param curP_ a polynomial given as an array with each consecutive element of
	 * the array having more accurate coefficients than the previous (by adding
	 * consecutive double precision coefficients to prior coefficients)
	 * @param is the micro-intervals
	 */
	function getRootsWithin(): RootInterval[] {
		const roots: RootInterval[] = [];

		// If there are no micro-intervals then check the interval between lb and ub.
		const LB = eEstimate(eHorner(curP_, lb));
		if (!is.length) {
			// close even root not possible
			const UB = eEstimate(eHorner(curP_, ub));
			if (LB*UB >= 0) { return []; }

			const [tS, tE] = eRefineCertified(
				curP_, lb, ub, LB, UB/*, δ*/
			);
			return [{ tS, tE, multiplicity: 1 }];
		}

		//---- First check from lb to the left side of the first micro-interval.
		let _a = is[0].tS;
		let _A = eEstimate(eHorner(curP_, _a));
		if (LB*_A > 0) {
			// no roots possible (curve is monotone increasing or decreasing)
		} else if (LB*_A < 0) {
			// recall LB must !== 0 as a precondition
			const [tS,tE] = eRefineCertified(
				curP_, lb, _a, LB, _A/*, δ*/
			);
			roots.push({ tS, tE, multiplicity: 1 });
		} //else {
			// _A === 0
			// no roots possible in [lb,_a]
		//}

		let a_ = lb;
		let A_ = LB;
		let _b = _a;
		let _B = _A;

		let a: RootInterval;
		for (let i=0; i<is.length; i++) {
			const i_ = is[i+1];  // right micro-interval
			a = is[i];

			_a = _b;
			a_ = is[i].tE;
			_b = i_ ? i_.tS : ub;
			
			const B_ = A_;
			_A = _B;
			A_ = eEstimate(eHorner(curP_, a_));
			_B = eEstimate(eHorner(curP_, _b));

			if (_A*A_ > 0) {
				//---- CASE 1: _A⇑ | A_⇑   OR   _A⇓ | A_⇓
				if (A_*_B > 0) {
					//---- CASE 1A: _A⇑ | A_⇑ | _B⇑   OR   _A⇓ | A_⇓ | _B⇓
					//console.log('CASE 1A');
					if (a_ !== _a && a.multiplicity%2 === 1) { 
						checkEvenAA();
					}
					// [a_,_b] → no root
				} else if (A_*_B < 0) {
					//---- CASE 1B: _A⇑ | A_⇑ | _B⇓   OR   _A⇓ | A_⇓ | _B⇑
					//console.log('CASE 1B');
					// we cannot exclude this case as their may be even 
					// multiplicity >= 4 roots; we would've been able if we
					// knew that a.multiplicity === 1 exactly and thus the code
					// could still be improved slightly
					if (a_ !== _a && a.multiplicity%2 === 1) { 
						checkEvenAA();
					}
					// [a_,_b] → single root (curve is monotone increasing or decreasing)
					const [tS,tE] = eRefineCertified(curP_, a_, _b, A_, _B/*, δ*/);
					roots.push({ tS, tE, multiplicity: 1 });
				} else { // _B === 0
					//---- CASE 1C: _A⇑ | A_⇑ | _B0   OR   _A⇓ | A_⇓ | _B0
					//console.log('CASE 1C');
					// we cannot exclude this case as their may be even 
					// multiplicity >= 4 roots; we would've been able if we
					// knew that a.multiplicity === 1 exactly and thus the code
					// could still be improved slightly
					if (a_ !== _a && a.multiplicity%2 === 1) { 
						checkEvenAA();
					}
					// [a_,_b] → no root
				}
			} else if (_A*A_ < 0) {
				//---- CASE 2 _A⇑ | A_⇓   OR   _A⇓ | A_⇑
				//console.log('CASE 2');
				// - [_a,a_] → odd root(s)
				roots.push({ tS: a.tS, tE: a.tE, multiplicity: 3 });
				if (A_*_B < 0) {
					//---- CASE 2A: _A⇑ | A_⇓ | _B⇑   OR   _A⇓ | A_⇑ | _B⇓
					//console.log('CASE 2A');
					// [a_,_b] → single root
					const [tS,tE] = eRefineCertified(curP_, a_, _b, A_, _B/*, δ*/);
					roots.push({ tS, tE, multiplicity: 1 });
				} else if (A_ * _B > 0) {
					//---- CASE 2B: _A⇑ | A_⇓ | _B⇓   OR   _A⇓ | A_⇑ | _B⇑
					//console.log('CASE 2B');
					// [a_,_b] → no roots
				} else { // _B === 0
					//console.log('CASE 2C');
					// [a_,_b] → no roots
				}
			} else if (A_ === 0) {
				//---- CASE 3A A_0
				//console.log('CASE 3A');
				// [_a,a_] → rational root at a_
				// There cannot be a root between a_ and _b since _B !== 0
				if (/*_a === a_ ||*/ _A === 0) {
					// multiple rational root at a_ OR both _A and A_ is 0
					// so update multiplicity parity
					roots.push({ tS: a.tS, tE: a.tE, multiplicity: a.multiplicity+1 });
				} else {
					// now _A and _B are both !== 0
					if (_A*_B > 0) {
						roots.push({ tS: a.tS, tE: a.tE, multiplicity: 2 });
					} else {
						roots.push({ tS: a.tS, tE: a.tE, multiplicity: 3 });
					}
				}            
			} else { // _A === 0
				//---- CASE 3B _A0
				//console.log('CASE 3B');

				// A_ !== 0 here and _a !== a_
				// [_a,a_] → rational root at _a
				if (A_*_B < 0) {
					// [a_,_b] → single root
					const [tS,tE] = eRefineCertified(curP_, a_, _b, A_, _B/*, δ*/);
					roots.push({ tS, tE, multiplicity: 1 });
				} else if (A_*_B > 0) {
					// [a_,_b] → no roots
				}

				// - [_a,a_] → 
				// B_ and A_ are both !== 0
				if (B_*A_ > 0) {
					roots.push({ tS: a.tS, tE: a.tE, multiplicity: 2 });
				} else {
					roots.push({ tS: a.tS, tE: a.tE, multiplicity: 3 });
				}
			}            
		}

		// Combine the root intervals if they are adjacent (they are not 
		// allowed to overlap)
		for (let i=0; i<roots.length-1; i++) {
			const r = roots[i];
			const r_ = roots[i+1];
			if (r.tE >= r_.tS) {
				return joinRoots(roots);
			}
		}

		return roots;


		/**
		 * Calculates and returns max 2nd derivative - calculated using something
		 * akin to a Taylor expansion - could be improved by not taking absolute
		 * values, but rather minimum mins. and maximum max values of f(s)?.
		 * maxDdP = |f(s)| + δ|f'(s)| + δ^2|f''(s)| + ..., where δ = (a_ - _a), 
		 * s = _a and f is the second derivative of the current polynomial. We can 
		 * also potentially short circuit the maxDdP calculation after some terms,
		 * the point being there are very likely many optimizations that can still 
		 * be done.
		 * 
		 * @internal
		 */
		function checkEvenAA() {
			const d = (a_ - _a) * onePlusEps;
			let mult = 1;
			let maxDdP = 0;
			for (let eDiffCount = diffCount + 2; eDiffCount<=deg; eDiffCount++) {
				const p = psExact_[eDiffCount][0];

				const h = hornerWithRunningError(p,_a);
				const fs = abs(h[0]) + h[1];
				maxDdP += fs * mult;
				mult *= d * onePlusEps;
			}

			// maxDdP is now calculated

			const AMinMax = A_ > 0 ? min(_A, A_) : max(_A, A_);
			const δ = 2*Number.EPSILON * max(1, abs(a_));
			const dMax = maxDdP * (2*δ);  // since the first derivative === 0 somewhere in [_a,a_]
			const yShift = A_ > 0 ? -dMax * 2*δ : dMax * 2*δ;
			const y = AMinMax + yShift;

			if (y * A_ < 0) {
				// possible even multiplicity root

				// The below multiplicity can really be any non-negative 
				// multiple of 2
				roots.push({ tS: a.tS, tE: a.tE, multiplicity: 2 });
			}
		}
	}
} 


function joinRoots(rs: RootInterval[]): RootInterval[] {
	const newRs: RootInterval[] = [];
	const r = rs[0];
	// make a clone of the first interval
	let curR: RootInterval = { tS: r.tS, tE: r.tE, multiplicity: r.multiplicity };
	for (let i=0; i<rs.length-1; i++) {
		const r = rs[i];
		const r_ = rs[i+1];
		if (r.tE < r_.tS) {
			// they don't stick together
			newRs.push(curR);
			// make a clone of the next interval
			curR = { tS: r_.tS, tE: r_.tE, multiplicity: r_.multiplicity };
		} else {
			// they stick together - expand
			curR.tE = r_.tE;
			curR.multiplicity = r.multiplicity + r_.multiplicity;
		}
	}
	newRs.push(curR);

	return newRs;
}


// TODO - docs + should it be included in new version?
/**
 * Refines exactly from the start
 * @param lb 
 * @param ub 
 * @param fa 
 * @param fb 
 * @param psExact 
 * @param diffCount 
 * 
 * @internal
 */
 function eRefineCertified(
		pExact: number[][],
		lb: number, 
		ub: number,
		fa: number,
		fb: number): number[] {

	return refineCertified(
		undefined, undefined, 
		lb, ub, fa, fb, 
		() => pExact,
		true
	);
}


export { eAllRootsCertified }
