
import rootOperators from './root-operators';
import Mobius        from './mobius';
import coreOperators from './core-operators';
import rootBounds    from './root-bounds';
        

const { 
    evaluate, evaluateAt0, negate, invert, 
    signChanges, changeVariables 
} = coreOperators;
const { brent } = rootOperators;
const { 
    positiveRootUpperBound_LMQ,	
    positiveRootLowerBound_LMQ, 
} = rootBounds;

	  
/** 
 * DO NOT USE. EXPERIMENTAL.
 * Find all the roots using the VAS algorithm followed by Brent's method.
 * @ignore
 * @param p - A square-free polynomial.
 **/
function allRootsVAS(p_: number[]): number[] {
	// TODO - First remove all zero roots  - The VAS method can't handle 
	// them.
	let p = removeZeroRoots(p_);
	let numZeros = p_.length - p.length;

	// TODO - Next, remove all multiple roots (i.e. do a square-free
	// factorization... - VAS doesn't like them either
	
	let vasRoots = vasRootIntervals(p)
	.map(function(interval: number[]): number {
		return brent(
				evaluate(p), 
				interval[0], 
				interval[1]
		); 
	});
	
	for (let i=0; i<numZeros; i++) {
		vasRoots.push(0);	
	}
	

	return vasRoots;
}


/**
 * Removes the zero roots from the polynomial.
 * @ignore
 * @returns {number[]} The deflated polynomial.
 */
// TODO - improve this function: readability + floating point tolerance
function removeZeroRoots(p_: number[]): number[] {
	let p = p_.slice();
	let i = 0;
	while (evaluateAt0(p) === 0) {
		let len = p.length;
		p.pop();
		i++;
	}
	
	return p;	
}


/** 
 * Finds root intervals of a polynomial such that each interval contains
 * exactly one root using the VAS (Vincent–Akritas–Strzeboński) method.
 * See http://www.e-ce.uth.gr/wp-content/uploads/formidable/phd_thesis_vigklas.pdf
 * @ignore
 */
// TODO - Square-free factorization ignored for now - duplicate roots 
// could cause an infinite loop - fix by checking if interval becomes
// smaller than a certain threshold.
function vasRootIntervals(p: number[]): number[][] {

	let positiveIntervals = vasRootIntervalsHelper(
		p,
		[[1,0],[0,1]]
	);
	
	let negativeIntervals = vasRootIntervalsHelper(
		changeVariables(p.slice(), -1, 0), 
		[[1,0],[0,1]]
	)
	.map(function(interval) {
		return negate(invert(interval));
	});
	
	return [...negativeIntervals, ...positiveIntervals];
}


/** 
 * Helper function
 * The initial mobius transformation must be [[1,0],[0,1]] = M(x) = x.
 * @private
 */
function vasRootIntervalsHelper(p: number[], mobius: number[][]): number[][] {
	
	// In the Vigklas, Akritas, Strzebonski paper, the steps are marked 
	// as below:
	
	// STEP 1
	let intervals = [];
	let signVariations = signChanges(p);
	
	// STEP 2
	if (signVariations === 0) { // Descartes' rule of signs
		return []; 
	}
	
	// STEP 3
	if (signVariations === 1) {
		let M0 = Mobius.evaluateAt0(mobius);  
		let MI = Mobius.evaluateAtInf(mobius); 
		let MM0 = Math.min(M0, MI);
		let MMI = Math.max(M0, MI);
		if (MMI === Number.POSITIVE_INFINITY) {
			MMI = Mobius.evaluate(
					mobius, positiveRootUpperBound_LMQ(p)
			);
		}

		return [[MM0,MMI]];
	}


	// STEP 4
	let lb = positiveRootLowerBound_LMQ(p);
	
	// STEP 5
	if (lb > 1)  {	
		// p ← p(x + lb)
		p = changeVariables(p, 1, lb);
		
		// M ← M(x + lb)
		mobius = Mobius.changeVariables(mobius, 1, lb);
	}


	// TODO - Include factor of 16 improvement by Strzebonski
	
	// STEP 6 - Look for real roots in (0, 1)
	
	// p01 ← (x + 1)^(deg(p)) *  p(1/(x+1))
	let p01 = changeVariables(invert(p), 1, 1); 
	
	// M01 ← M(1/(x+1))
	let M01 = Mobius.changeVariables(Mobius.invert(mobius), 1, 1);

	// STEP 7 - Is 1 a root?
	let m = Mobius.evaluate(mobius, 1);
	
	// STEP 8 - Look for real roots in (1, ∞)
	
	// p1∞ ← p(x + 1)
	let p1inf = changeVariables(p, 1, 1);
	
	// M1∞ ← M(x + 1)
	let M1inf = Mobius.changeVariables(mobius, 1, 1); 
	
	// STEPS 9 -> 13
	let intervals1 = vasRootIntervalsHelper(p01, M01);	
	let intervals3 = vasRootIntervalsHelper(p1inf, M1inf);	
	
	
	if (evaluate(p)(1) === 0) {
		intervals1.push([m,m]);
	}
	
	return [].concat(intervals1, intervals3); 
}


export default allRootsVAS;