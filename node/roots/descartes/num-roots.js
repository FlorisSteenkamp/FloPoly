"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sturm_chain_1 = require("../../remainder-sequences/sturm-chain");
const evaluate_1 = require("../../evaluate/evaluate");
const evaluate_exact_1 = require("../../evaluate/evaluate-exact");
const sign_changes_1 = require("./sign-changes");
const flo_numerical_1 = require("flo-numerical");
const degree_1 = require("../../basic/degree");
const evaluate_at_1_1 = require("../../evaluate/evaluate-at-1");
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
function numRootsInRange(p, a, b) {
    let ps = sturm_chain_1.sturmChain(p);
    let as = ps.map(p => evaluate_1.evaluate(p, a));
    let bs = ps.map(p => evaluate_1.evaluate(p, b));
    return sign_changes_1.signChanges(as) - sign_changes_1.signChanges(bs);
}
exports.numRootsInRange = numRootsInRange;
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
function numRootsInRangeExact(p, a, b) {
    let ps = sturm_chain_1.sturmChainExact(p);
    let as = ps.map(p => evaluate_exact_1.evaluateExact(p, a));
    let bs = ps.map(p => evaluate_exact_1.evaluateExact(p, b));
    return sign_changes_1.expSignChanges(as) - sign_changes_1.expSignChanges(bs);
}
exports.numRootsInRangeExact = numRootsInRangeExact;
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
function numRootsExact(p) {
    let ps = sturm_chain_1.sturmChainExact(p);
    let as = ps.map(p => degree_1.degree(p) % 2 === 0 ? flo_numerical_1.sign(p[0]) : -flo_numerical_1.sign(p[0]));
    let bs = ps.map(p => flo_numerical_1.sign(p[0]));
    return sign_changes_1.signChanges(as) - sign_changes_1.signChanges(bs);
}
exports.numRootsExact = numRootsExact;
/**
 * Returns the exact number of *distinct* real roots in the interval (0,1) of the
 * given polynomial.
 * @param p a polynomial
 * @param a a lower bound
 * @param b an upper bound
 */
function numRootsIn01Exact(p) {
    let ps = sturm_chain_1.sturmChainExact(p);
    let as = ps.map(p => p[p.length - 1]); // evaluate at 0
    let bs = ps.map(p => evaluate_at_1_1.expEvaluateAt1(p)); // evaluate at 1
    return sign_changes_1.expSignChanges(as) - sign_changes_1.expSignChanges(bs);
}
exports.numRootsIn01Exact = numRootsIn01Exact;
//# sourceMappingURL=num-roots.js.map