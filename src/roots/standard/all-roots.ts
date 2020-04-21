
import { brent } from './brent';
import { quadraticRoots } from '../quadratic-roots';
import { positiveRootUpperBound_LMQ, negativeRootUpperBound_LMQ } from '../root-bounds/root-bounds-lmq';
import { removeLeadingZeros } from '../../basic/remove-leading-zeros';
import { differentiate } from '../../calculus/differentiate';
import { evaluate } from '../../evaluate/evaluate';


/**
 * Finds an approximation to the real roots (or those within a range) of the 
 * input polynomial.
 *
 * Multiple roots of even order that is close together may be missed.
 * @param p a polynomial
 * @param a lower limit of root values to be returned - defaults to -∞
 * @param b upper limit of root values to be returned - defaults to +∞
 * @example
 * allRoots([1, -10, 35, -50, 24]); //=> [1, 2.0000000000000036, 3.0000000000000067, 4] 
 */
function allRoots(
		p: number[], 
		a = Number.NEGATIVE_INFINITY, 
		b = Number.POSITIVE_INFINITY): number[] {

    p = removeLeadingZeros(p);
    
	let d = p.length-1;
	let rangeFilter = inRange(a,b);
	
	if (d === 2) {
		return quadraticRoots(p)
		.filter(rangeFilter);
	} else if (d >= 2) {
		let lowerBound = a === Number.NEGATIVE_INFINITY
			? negativeRootUpperBound_LMQ(p)
			: a;

		let upperBound = b === Number.POSITIVE_INFINITY
			? positiveRootUpperBound_LMQ(p)
			: b;

		// If the roots of the differentiated polynomial is out of range 
		// then the roots of the polynomial itself will also be out of 
		// range.
		let dp = differentiate(p);
		let roots = allRoots(dp, lowerBound, upperBound)
			.filter(rangeFilter);
		
		if (roots[0] !== lowerBound) {
			// For code coverage to cover the 'else' case we would need
			// to find a case where the lower bound actually matches the
			// root which would be very rare - needs further 
			// investigation.
			
			// Not an actual root.
			roots.unshift(lowerBound); 
		}
		if (roots[roots.length-1] !== upperBound) {
			// Not an actual root.
			roots.push(upperBound);    
		}
		return rootsWithin(p, roots);
	} else if (d === 1) {
		// Less likely so put near bottom (micro optimization)
		return [-p[1]/p[0]]
		.filter(rangeFilter);
	} else if (d === 0) {
		return []; // y = c -> no roots	
	}

	// Least likely so put at bottom (micro optimization)
	// d === -1
	// y = 0 -> infinite number of roots
	return [];  
}


/**
 * Returns a function that returns true if x is in the range [a,b].
 * @param a
 * @param b
 * @private
 */
function inRange(a: number, b: number): ((x: number) => boolean) {
	return x => x >= a && x <= b;	
}


/**
 * Finds all roots of the given polynomial within the given intervals.
 * @private
 * @param p
 * @param intervals
 */
function rootsWithin(p: number[], intervals: number[]): number[] {

	let roots = [];
	let peval = evaluate(p);
	
	let prevRoot;
	let a = intervals[0];
	for (let i=1; i<intervals.length; i++) {
		let root; 
		let b = intervals[i];
		
		let evA = peval(a);
		let evB = peval(b);
		
		let k = evA*evB;
		
		if (k === 0) {
			if (evA === 0) {
				root = a;
			} else if (evB === 0 && i === intervals.length-1) {
				root = b;
			}
		} else if (evA*evB < 0) {
			root = brent(peval, a, b);
		}
		
		// Add root if it exists and suppress exact duplicates
		if (root !== undefined && root !== prevRoot) {  
			roots.push(root);
			prevRoot = root;
		}
		
		a = b;
	}
	
	return roots;	
}


export { allRoots }
