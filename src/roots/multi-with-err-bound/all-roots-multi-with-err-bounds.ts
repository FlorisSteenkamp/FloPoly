
import { differentiateQuadWithError as differentiateQuadWithError_, differentiateExact as differentiateExact_ } from "../../calculus/differentiate";
import { evalK1MultiWithErrBounds as evalK1MultiWithErrBounds_ } from "../../evaluate/eval-k-multi-with-err-bounds";
import { HornerExact as HornerExact_ } from "../../evaluate/horner-exact";
import { transposePoly as transposePoly_ } from "./transpose-poly";
import { RootInterval } from "./root-interval";
import { evalAdaptive as evalAdaptive_ } from "./eval-adaptive";
import { refineMultiWithErrBounds as refineMultiWithErrBounds_ } from "./refine-multi-with-err-bounds";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const differentiateQuadWithError = differentiateQuadWithError_;
const evalK1MultiWithErrBounds = evalK1MultiWithErrBounds_;
const HornerExact = HornerExact_;
const transposePoly = transposePoly_;
const evalAdaptive = evalAdaptive_;
const refineMultiWithErrBounds = refineMultiWithErrBounds_;
const differentiateExact = differentiateExact_;


/**
 * Finds and returns all root intervals within [0,1] of a given polynomial, 
 * including their multiplicities (see points below).
 * * **precondition** interval must be a subset of [0,1]
 * * specialized for the interval [0,1]
 * * multiplicities are positive integers - in extremely rare cases a
 * multiplicity may be an even number higher than the one returned ????
 * * the returned intervals are of max width 2*Number.EPSILON; if an interval
 * is of higher width then it contains multiple roots; the max width
 * * the highest degree coefficient of the input polynomial's exact value should
 * be !== 0
 * @param p a polynomial with quad-precision coefficients.
 * @param pE error bound polynomial (given as absolute errors on each coefficient)
 * @param lb lower limit of root values to be returned - defaults to 0
 * @param ub upper limit of root values to be returned - defaults to 1
 * @param getPsExact a function returning the exact polynomial and its 
 * derivatives if required when the error bounds are too high during calculation
 */
function allRootsMultiWithErrBounds(
		p: number[][],
		pE: number[],
		getPsExact: () => number[][][] = undefined,
		lb = 0,
		ub = 1): RootInterval[] {

	let δ = 2*Number.EPSILON;
	//let lb = 0;
	//let ub = 1;
	let psExact: { ps: number[][][] } = { ps: undefined }

	if (!getPsExact) {
		getPsExact = () => {
			let poly = p;
			let psExact = [poly];
			while (poly.length > 1) {
				poly = differentiateExact(psExact[psExact.length-1]);
				psExact.push(poly);
			}

			return psExact;
		}
	}

	let p_ = transposePoly(p);

	/** evaluation at lb */
	let LB = 0;
	/** evaluation at ub */
	let UB = 0;

	let bCount: number;
	let exact: boolean;
	bCount = 0;
	exact = false;
	do {
		LB = exact 
			? HornerExact(psExact.ps[0], lb)
			: evalK1MultiWithErrBounds(p_, pE, lb).r̂;
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
	do {
		UB = exact 
			? HornerExact(psExact.ps[0], ub)
			: evalK1MultiWithErrBounds(p_, pE, ub).r̂;
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

	let ps = [{ p, pE }];
	for (let i=0; i<p.length-1; i++) {
		ps.push(differentiateQuadWithError(ps[i])); 
	}

	//console.log(ps)

	let rs: RootInterval[] = [];
	let deg = p.length-1;
	let maxDp_ = Math.abs(ps[deg].p[0][1]); // abs value of last derivative msb
	let maxDp: number; // only used after second iteration
	for (let i=1; i<p.length; i++) {
		let { p, pE } = ps[deg-i];
		let p_ = transposePoly(p);

		rs = getRootsWithin(p_, pE, rs, δ, deg-i);

		maxDp = maxDp_;
		maxDp_ = 0;
		let p0 = p_[0];
		for (let j=0; j<p.length; j++) {
			maxDp_ += Math.abs(p0[j]);
		}
	}

	return rs;


	// START OF FUNCTION getRootsWithin - it has been 'inlined' to take 
	// advantage of the closure so that bounds can be adjusted easier and so
	// we don't have to pass a lot of values

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
	//        : A_/_A close enough to zero ? close even root : no roots
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
	 * Finds all roots of the given polynomial within the given intervals.
	 * * **precondition** intervals should be disjoint, i.e endpoints are not allowed 
	 * to be equal - it must be that a_ !== _b
	 * * **precondition** the curve must be monotone increasing or decreasing between 
	 * b_ and _a AND a_ and _b
	 * * **precondition** the value at the lower bound (LB) and upper bound (UB)
	 * must !== 0
	 * @param p
	 * @param is the micro-intervals
	 */
	function getRootsWithin(
			p: number[][], 
			pE: number[],
			is: RootInterval[],
			δ: number,
			diffCount: number): RootInterval[] {

		let roots: RootInterval[] = [];

		// If there are no micro-intervals then check the interval between lb and ub.
		let LB = evalAdaptive(p,pE,lb,psExact,getPsExact,diffCount);
		if (!is.length) {
			// close even root not possible
			let UB = evalAdaptive(p,pE,ub,psExact,getPsExact,diffCount);
			if (LB*UB >= 0) { return []; }

			let [tS, tE] = refineMultiWithErrBounds(
				p, pE, lb, ub, LB, UB, psExact, getPsExact, diffCount, δ
			);
			return [{ tS, tE/*, tM: (tE + tS)/2*/, multiplicity: 1 }];
		}

		//---- First check from lb to the left side of the first micro-interval.
		let _a = is[0].tS;
		let _A = evalAdaptive(p,pE,_a,psExact,getPsExact,diffCount);
		if (LB*_A > 0) {
			// no roots possible (curve is monotone increasing or decreasing)
		} else if (LB*_A < 0) {
			// recall LB must !== 0 as a precondition
			let [tS,tE] = refineMultiWithErrBounds(
				p, pE, lb, _a, LB, _A, psExact, getPsExact, diffCount, δ
			);
			roots.push({ tS, tE/*, tM: (tE + tS)/2*/, multiplicity: 1 });
		} //else {
			// _A === 0
			// no roots possible in [lb,_a]
		//}

		let a_ = lb;
		let A_ = LB;
		let _b = _a;
		let _B = _A;

		for (let i=0; i<is.length; i++) {
			let i_ = is[i+1];  // right micro-interval
			let a = is[i];

			_a = _b;
			a_ = is[i].tE;
			_b = i_ ? i_.tS : ub;
			
			let B_ = A_;
			_A = _B;
			A_ = evalAdaptive(p,pE,a_,psExact,getPsExact,diffCount);
			_B = evalAdaptive(p,pE,_b,psExact,getPsExact,diffCount);


			/** if we must check for even roots */
			let checkEvenAA = false;

			if (_A*A_ > 0) {
				//---- CASE 1: _A⇑ | A_⇑   OR   _A⇓ | A_⇓
				//console.log('CASE 1');
				if (A_*_B > 0) {
					//---- CASE 1A: _A⇑ | A_⇑ | _B⇑   OR   _A⇓ | A_⇓ | _B⇓
					//console.log('CASE 1A');
					if (a_ !== _a && a.multiplicity%2 === 1) { 
						checkEvenAA = true; 
					}
					// [a_,_b] → no root
				} else if (A_*_B < 0) {
					//---- CASE 1B: _A⇑ | A_⇑ | _B⇓   OR   _A⇓ | A_⇓ | _B⇑
					//console.log('CASE 1B');
					if (a_ !== _a && a.multiplicity%2 === 1) { 
						checkEvenAA = true; 
					}
					// [a_,_b] → single root (curve is monotone increasing or decreasing)
					let [tS,tE] = refineMultiWithErrBounds(p, pE, a_, _b, A_, _B, psExact, getPsExact, diffCount, δ);
					roots.push({ tS, tE/*, tM: (tE + tS)/2*/, multiplicity: 1 });
				} else { // _B === 0
					//---- CASE 1C: _A⇑ | A_⇑ | _B0   OR   _A⇓ | A_⇓ | _B0
					//console.log('CASE 1C');
					//console.log(_B);
					if (a_ !== _a && a.multiplicity%2 === 1) { 
						checkEvenAA = true; 
					}
					// [a_,_b] → no root
				}
			} else if (_A*A_ < 0) {
				//---- CASE 2 _A⇑ | A_⇓   OR   _A⇓ | A_⇑
				//console.log('CASE 2');
				// - [_a,a_] → odd root(s)
				roots.push({ tS: a.tS, tE: a.tE/*, tM: a.tM*/, multiplicity: 3 });
				if (A_*_B < 0) {
					//---- CASE 2A: _A⇑ | A_⇓ | _B⇑   OR   _A⇓ | A_⇑ | _B⇓
					//console.log('CASE 2A');
					// [a_,_b] → single root
					let [tS,tE] = refineMultiWithErrBounds(p, pE, a_, _b, A_, _B, psExact, getPsExact, diffCount, δ);
					roots.push({ tS, tE/*, tM: (tE + tS)/2*/, multiplicity: 1 });
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
					roots.push({ tS: a.tS, tE: a.tE/*, tM: a.tM*/, multiplicity: a.multiplicity+1 });
				} else {
					// now _A and _B are both !== 0
					if (_A*_B > 0) {
						roots.push({ tS: a.tS, tE: a.tE/*, tM: a.tM*/, multiplicity: 2 });
					} else {
						roots.push({ tS: a.tS, tE: a.tE/*, tM: a.tM*/, multiplicity: 3 });
					}
				}            
			} else { // _A === 0
				//---- CASE 3B _A0
				//console.log('CASE 3B');

				// A_ !== 0 here and _a !== a_
				// [_a,a_] → rational root at _a
				if (A_*_B < 0) {
					// [a_,_b] → single root
					let [tS,tE] = refineMultiWithErrBounds(p, pE, a_, _b, A_, _B, psExact, getPsExact, diffCount, δ);
					roots.push({ tS, tE/*, tM: (tE + tS)/2*/, multiplicity: 1 });
				} else if (A_*_B > 0) {
					// [a_,_b] → no roots
				}

				// - [_a,a_] → 
				// B_ and A_ are both !== 0
				if (B_*A_ > 0) {
					roots.push({ tS: a.tS, tE: a.tE/*, tM: a.tM*/, multiplicity: 2 });
				} else {
					roots.push({ tS: a.tS, tE: a.tE/*, tM: a.tM*/, multiplicity: 3 });
				}
			}            


			// Check for double roots
			//if (_A * A_ > 0 && _a !== a_) {
			if (checkEvenAA) {
				//console.log('checking even');
				let AMinMax = A_ > 0 ? Math.min(_A, A_) : Math.max(_A, A_);
				let dMax = maxDp * (2*δ);
				let yShift = A_ > 0 ? -dMax * 2*δ : dMax * 2*δ;
				let y = AMinMax + yShift;
				//console.log(maxDp);

				if (y * A_ < 0) {
					// possible even multiplicity  root
					//console.log('possible even multiplicty root: ', _a, a_);
					// The below multiplicity can really be any multiple of 2
					roots.push({ tS: a.tS, tE: a.tE/*, tM: a.tM*/, multiplicity: 2 });
				}
			}
		}

		//---- Combine the root intervals if they are adjacent (they cannot overlap)
		for (let i=0; i<roots.length-1; i++) {
			let r = roots[i];
			let r_ = roots[i+1];
			if (r.tE === r_.tS) {
				return joinRoots(roots);
			}
		}

		return roots;
	}
} 


// TODO - doc plus test joinRoots
function joinRoots(rs: RootInterval[]): RootInterval[] {
	let newRs: RootInterval[] = [];
	let r = rs[0];
	// make a clone of the first interval
	let curR: RootInterval = { tS: r.tS, tE: r.tE/*, tM: r.tM*/, multiplicity: r.multiplicity };
	for (let i=0; i<rs.length-1; i++) {
		let r = rs[i];
		let r_ = rs[i+1];
		if (r.tE !== r_.tS) {
			// they don't stick together
			newRs.push(curR);
			// make a clone of the next interval
			curR = { tS: r_.tS, tE: r_.tE/*, tM: r_.tM*/, multiplicity: r_.multiplicity };
		} else {
			// they stick together - expand
			curR.tE = r_.tE;
			curR.multiplicity = r.multiplicity + r_.multiplicity;
		}
	}
	newRs.push(curR);

	console.log('joined')

	return newRs;
}




export { allRootsMultiWithErrBounds }

