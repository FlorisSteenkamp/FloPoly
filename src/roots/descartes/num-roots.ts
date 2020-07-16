
import { sturmChain as sturmChain_, sturmChainExact as sturmChainExact_ } from "../../remainder-sequences/sturm-chain";
import { evaluate as evaluate_ } from "../../evaluate/evaluate";
import { evaluateExact as evaluateExact_ } from "../../evaluate/evaluate-exact";
import { signChanges as signChanges_, expSignChanges as expSignChanges_ } from "./sign-changes";
import { eSign as eSign_ } from "big-float-ts";
import { degree as degree_ } from "../../basic/degree";
import { expEvaluateAt1 as expEvaluateAt1_ } from "../../evaluate/evaluate-at-1";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const sturmChain = sturmChain_;
const evaluate = evaluate_;
const evaluateExact = evaluateExact_;
const signChanges = signChanges_;
const eSign = eSign_;
const degree = degree_;
const expEvaluateAt1 = expEvaluateAt1_;
const sturmChainExact = sturmChainExact_;
const expSignChanges = expSignChanges_;


/** 
 * Returns the approximate number of *distinct* real roots in the interval (a,b) of the 
 * given polynomial.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 * @example 
 * let p = [1, 1, -64, 236, -240];
 * numRootsInRange(p,-20,-11); //=> 0
 * numRootsInRange(p,-11,-9);  //=> 1  
 * numRootsInRange(p,-11,3.5); //=> 3
 * numRootsInRange(p,-11,5);   //=> 4
 */ 
function numRootsInRange(p: number[], a: number, b: number): number {
	let ps = sturmChain(p);
	let as = ps.map(p => evaluate(p,a));
	let bs = ps.map(p => evaluate(p,b));
	
	return signChanges(as) - signChanges(bs);
}


/**
 * Returns the exact number of *distinct* real roots in the interval (a,b) of the 
 * given polynomial.
 * * From Wikipedia: In the case of a non-square-free polynomial, if neither a nor b is a multiple root of p, then V(a) − V(b) is the number of distinct real roots of P.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 * @example 
 * let p = [[1], [1], [-64], [236], [-240]];
 * numRootsInRangeExact(p,-20,-11); //=> 0
 * numRootsInRangeExact(p,-11,-9);  //=> 1  
 * numRootsInRangeExact(p,-11,3.5); //=> 3
 * numRootsInRangeExact(p,-11,5);   //=> 4
 */
function numRootsInRangeExact(
		p: number[][], 
		a: number[], 
		b: number[]): number {

	let ps = sturmChainExact(p);
	let as = ps.map(p => evaluateExact(p,a));
	let bs = ps.map(p => evaluateExact(p,b));
	
	return expSignChanges(as) - expSignChanges(bs);
}


/**
 * Returns the exact number of *distinct* real roots in the interval (-∞,+∞) of the 
 * given polynomial.
 * * From Wikipedia: In the case of a non-square-free polynomial, if neither a nor b is a multiple root of p, then V(a) − V(b) is the number of distinct real roots of P.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 * @example 
 * let p = [[1], [1], [-64], [236], [-240]];
 * numRootsExact(p); //=> 4
 */
function numRootsExact(p: number[][]): number {
	let ps = sturmChainExact(p);
	let as = ps.map(p => degree(p) % 2 === 0 ? eSign(p[0]) : -eSign(p[0]));
	let bs = ps.map(p => eSign(p[0]));
	
	return signChanges(as) - signChanges(bs);
}


/**
 * Returns the exact number of *distinct* real roots in the interval (0,1) of the 
 * given polynomial.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 */
function numRootsIn01Exact(p: number[][]): number {
	let ps = sturmChainExact(p);
	let as = ps.map(p => p[p.length-1]); // evaluate at 0
	let bs = ps.map(p => expEvaluateAt1(p)); // evaluate at 1
	
	return expSignChanges(as) - expSignChanges(bs);
}


export { 
	numRootsInRange, 
	numRootsInRangeExact, 
	numRootsExact, 
	numRootsIn01Exact
}
