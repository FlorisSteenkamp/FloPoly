
import { ddDifferentiateWithError as ddDifferentiateWithError_ } from "../../calculus/double-double/dd-differentiate-with-err";
import { eDifferentiate as eDifferentiate_ } from '../../calculus/expansion/e-differentiate';
import { evalCertified as evalCertified_ } from "../../evaluate/double/eval-certified";
import { eHorner as eHorner_ } from "../../evaluate/expansion/e-horner";
import { transposePoly as transposePoly_ } from "./transpose-poly";
import { evalAdaptive as evalAdaptive_ } from "./eval-adaptive";
import { refineCertified as refineCertified_ } from "./refine-certified";
import { eEstimate as eEstimate_ } from "big-float-ts";
import { negativeRootLowerBound_LMQ as negativeRootUpperBound_LMQ_ } from "../root-bounds/root-bounds-lmq";
import { positiveRootUpperBound_LMQ as positiveRootUpperBound_LMQ_ } from "../root-bounds/root-bounds-lmq";
import { hornerWithRunningError as hornerWithRunningError_ } from "../../evaluate/double/horner-with-running-error";
import { RootInterval } from "./root-interval";
//import { toCasStr } from "../../basic/to-cas-str";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const ddDifferentiateWithError = ddDifferentiateWithError_;
const evalCertified = evalCertified_;
const eHorner = eHorner_;
const transposePoly = transposePoly_;
const evalAdaptive = evalAdaptive_;
const refineCertified = refineCertified_;
const negativeRootUpperBound_LMQ = negativeRootUpperBound_LMQ_;
const positiveRootUpperBound_LMQ = positiveRootUpperBound_LMQ_;
const eDifferentiate = eDifferentiate_;
const eEstimate = eEstimate_;
const hornerWithRunningError = hornerWithRunningError_;

const max = Math.max;
const min = Math.min;
const abs = Math.abs;
const eps = Number.EPSILON;
const onePlusEps = 1 + eps;


/**
 * Finds and returns all *certified* root intervals (bar underflow / overflow) 
 * of the given polynomial, including their multiplicities (see points below).
 * 
 * * returns an empty array for a constant or the zero polynomial
 * 
 * * const `W = m * Number.EPSILON * max(1, 2^⌈log₂r⌉)`, where
 *  * `r` is a root
 *  * `m` is the number of roots (the 'multiplicity') within the 
 *     interval, where multiplicity here includes roots seperated by less than 
 *    `2*Number.EPSILON` and not necessarily only exact multiple roots; 
 *
 * * the returned intervals are of max width `W` - use `refineK` to 
 * reduce the root interval widths further and thus 'resolving' the roots if 
 * required
 * 
 * * the retuned root intervals will contain *all* roots hence the *certified*
 * in the function name.
 * 
 * * the reported multiplicities will be correct up to a multiple of 2 in cases
 * where *more* than 1 root is reported in the interval `W` described above
 * (else if a multiplicity of 0 or 1 is reported the result is correct)
 * * `refineK` can then be used to resolve them further; note however 
 * that root seperation is a function of polynomial height and can be very small 
 * (see e.g. [Improving Root Separation Bounds, *Aaron Herman, Hoon Hong, Elias Tsigaridas*](https://hal.inria.fr/hal-01456686/document)
 * 
 * * optimized for polynomials of degree 1 to about 30
 *  * this is due to [Rolle's Theorem](https://en.wikipedia.org/wiki/Rolle%27s_theorem) 
 * being used and not [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *  * Descartes' methods are asymptotically faster and thus better suited for higher 
 * degree polynomials but for lower degrees Rolle's Theorem seems to be faster
 * 
 * * **precondition:** the coefficient magnitudes and degree of the polynomial
 *  must be such that overflow won't occur at evaluation points where roots
 * are searched for, e.g. a 20th degree polynomial with coefficients of 
 * magnitude around `Number.MAX_SAFE_INTEGER (= 9007199254740991)` evaluated at
 * `x = 1000000` will evaluate to about `10^136` (10 the the power of 136) which 
 * is way too small for overflow to occur, however when evaluated at `x = 10^15`
 * overflow will occur; to prevent this unlikely possibility (roots are 
 * typically not that large in applications) limit the bounds `lb` and `ub` 
 * where roots are to be searched for to the range of interest, i.e. don't set
 * them to infinity for automatic calculation
 * 
 * @param p a polynomial with coefficients given densely as an array of 
 * double-double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`; if the 
 * coefficients are double precision (as opposed to double-double) then instead
 * of passing `p` pass `p.map(c => [0,c])` - this will transform the 
 * coefficients to double-double precision
 * @param lb defaults to 0; lower bound of roots to be returned; 
 * `Number.NEGATIVE_INFINITY` may be given if there is no lower bound
 * @param ub defaults to 1; upper bound of roots to be returned;
 * `Number.POSITIVE_INFINITY` may be given if there is no upper bound
 * @param pE defaults to `undefined`; an error polynomial that provides a 
 * coefficientwise error bound on the input polynomial; all coefficients must 
 * be positive; if `undefined `then the input polynomial will be assumed exact
 * @param getPExact defaults to `undefined`; a function returning the exact 
 * polynomial (with coefficients given as Shewchuk expansions (see the example 
 * below)) - `getPExact` will *only* be called if required (and can thus be 
 * lazy loaded) when the error bounds are too high during calculation
 * preventing certification of the root intervals; 
 * 
 * @example
 * 
 * // -----------------------------------------------------------------
 * // 1. the Wilksonson polynomial (deemed one of the hardest cases) --
 * // -----------------------------------------------------------------
 * 
 */
function allRootsCertified(
		p: number[][],
		lb = 0,
		ub = 1,
		pE: number[] = undefined,
		getPExact: () => number[][] = undefined): RootInterval[] {


	// return an empty array for a constant or the zero polynomial
	if (p.length <= 1) {
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

	const δ = 2*Number.EPSILON * max(1, max(abs(lb), abs(ub)));

	pE = pE || new Array(p.length).fill(0);  // no error

	const psExact: { ps: number[][][] } = { ps: undefined }

	if (!getPExact) { getPExact = () => p; }

	const getPsExact = () => {
		let poly = getPExact();
		const psExact = [poly];
		while (poly.length > 1) {
			poly = eDifferentiate(psExact[psExact.length-1]);
			psExact.push(poly);
		}

		return psExact;
	}

	const p_ = transposePoly(p);
	
	
	let bCount: number;
	let exact: boolean;

	bCount = 0;
	exact = false;
	let LB = 0;  // evaluation at lb
	do {
		LB = exact 
			? eEstimate(eHorner(psExact.ps[0], lb))
			: evalCertified(p_, pE, lb);
		if (LB === 0) {
			bCount++;
			// the max bCount is imperically selected for max performance
			if (bCount >= 3 && !exact) { 
				exact = true;
				psExact.ps = psExact.ps || getPsExact();
				continue;
			}
			lb -= δ;
		}
	} while (LB === 0);
		
	bCount = 0;
	exact = false;
	let UB = 0;  // evaluation at ub
	do {
		UB = exact 
			? eEstimate(eHorner(psExact.ps[0], ub))
			: evalCertified(p_, pE, ub);
		if (UB === 0) {
			bCount++;
			if (bCount >= 3 && !exact) { // the max bCount is imperically selected for max performance
				exact = true;
				psExact.ps = psExact.ps || getPsExact();
				continue;
			}
			ub += δ;
		}
	} while (UB === 0);


	const deg = p.length-1;

	// Get all derivatives with their coefficient-wise error bounds, i.e. 
	// ps === [p, dp, ddp, ..., constant]
	//        [0,  1,   2, ..., deg     ]
	const ps = [{ p, pE }];
	const ps_ = [transposePoly(p)]; // the transposed versions
	for (let i=1; i<=deg; i++) {
		const dP = ddDifferentiateWithError(ps[i-1]);
		ps.push(dP);
		ps_.push(transposePoly(dP.p)); // the transposed versions
	}

	let is: RootInterval[] = [];
	let diffCount = deg-1;
	let curPE: number[];
	let curP_: number[][];
	for (; diffCount>=0; diffCount--) {
		curPE = ps[diffCount].pE;

		// on first iteration p_ is linear, on second it is quadratic, etc. ...
		curP_ = ps_[diffCount];

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
	 * the array having more accurate coefficients than the previous
	 * @param is the micro-intervals
	 */
	function getRootsWithin(): RootInterval[] {
		const roots: RootInterval[] = [];

		// If there are no micro-intervals then check the interval between lb and ub.
		const LB = evalAdaptive(curP_, curPE, lb, psExact, getPsExact, diffCount);
		if (!is.length) {
			// close even root not possible
			const UB = evalAdaptive(curP_, curPE, ub, psExact, getPsExact, diffCount);
			if (LB*UB >= 0) { return []; }

			const [tS, tE] = refineCertified(
				curP_, curPE, lb, ub, LB, UB, psExact, getPsExact, diffCount/*, δ*/
			);
			return [{ tS, tE, multiplicity: 1 }];
		}

		//---- First check from lb to the left side of the first micro-interval.
		let _a = is[0].tS;
		let _A = evalAdaptive(curP_,curPE,_a,psExact,getPsExact,diffCount);
		if (LB*_A > 0) {
			// no roots possible (curve is monotone increasing or decreasing)
		} else if (LB*_A < 0) {
			// recall LB must !== 0 as a precondition
			const [tS,tE] = refineCertified(
				curP_, curPE, lb, _a, LB, _A, psExact, getPsExact, diffCount/*, δ*/
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
			A_ = evalAdaptive(curP_,curPE,a_,psExact,getPsExact,diffCount);
			_B = evalAdaptive(curP_,curPE,_b,psExact,getPsExact,diffCount);

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
					// multiplicity >= 4 roots
					if (a_ !== _a && a.multiplicity%2 === 1) { 
						checkEvenAA();
					}
					// [a_,_b] → single root (curve is monotone increasing or decreasing)
					const [tS,tE] = refineCertified(curP_, curPE, a_, _b, A_, _B, psExact, getPsExact, diffCount/*, δ*/);
					roots.push({ tS, tE, multiplicity: 1 });
				} else { // _B === 0
					//---- CASE 1C: _A⇑ | A_⇑ | _B0   OR   _A⇓ | A_⇓ | _B0
					//console.log('CASE 1C');
					// we cannot exclude this case as their may be even 
					// multiplicity >= 4 roots
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
					const [tS,tE] = refineCertified(curP_, curPE, a_, _b, A_, _B, psExact, getPsExact, diffCount/*, δ*/);
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
					const [tS,tE] = refineCertified(curP_, curPE, a_, _b, A_, _B, psExact, getPsExact, diffCount/*, δ*/);
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
			//This was the old method when the function only supported lb = 0, ub = 1
			//-----------------------------------------------------------------------
			//const ddP0 = diffCount+2 > deg ? undefined : ps_[diffCount+2][0];
			//const maxDdP2 = 0;
			//for (const j=0; j<ddP0.length; j++) {
			//	// evaluate at 1
			//	maxDdP2 += abs(ddP0[j]);  // this is valid only if |lb| and |ub| <= 1
			//}

			const d = (a_ - _a) * onePlusEps;
			let mult = 1;
			let maxDdP = 0;
			for (let ddDiffCount = diffCount + 2; ddDiffCount<=deg; ddDiffCount++) {
				const p = ps_[ddDiffCount][0];

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

				//console.log('A_, yShift', A_, yShift);
				//console.log(toCasStr(ps_[0][0]));
				//console.log('possible even multiplicty root: ', _a, a_);

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




export { allRootsCertified }
