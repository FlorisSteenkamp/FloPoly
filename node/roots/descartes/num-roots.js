"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numRootsIn01Exact = exports.numRootsExact = exports.numRootsInRangeExact = exports.numRootsInRange = void 0;
const sturm_chain_1 = require("../../remainder-sequences/sturm-chain");
const evaluate_1 = require("../../evaluate/evaluate");
const evaluate_exact_1 = require("../../evaluate/evaluate-exact");
const sign_changes_1 = require("./sign-changes");
const big_float_ts_1 = require("big-float-ts");
const degree_1 = require("../../basic/degree");
const evaluate_at_1_1 = require("../../evaluate/evaluate-at-1");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const sturmChain = sturm_chain_1.sturmChain;
const evaluate = evaluate_1.evaluate;
const evaluateExact = evaluate_exact_1.evaluateExact;
const signChanges = sign_changes_1.signChanges;
const eSign = big_float_ts_1.eSign;
const degree = degree_1.degree;
const expEvaluateAt1 = evaluate_at_1_1.expEvaluateAt1;
const sturmChainExact = sturm_chain_1.sturmChainExact;
const expSignChanges = sign_changes_1.expSignChanges;
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
    let ps = sturmChain(p);
    let as = ps.map(p => evaluate(p, a));
    let bs = ps.map(p => evaluate(p, b));
    return signChanges(as) - signChanges(bs);
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
    let ps = sturmChainExact(p);
    let as = ps.map(p => evaluateExact(p, a));
    let bs = ps.map(p => evaluateExact(p, b));
    return expSignChanges(as) - expSignChanges(bs);
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
    let ps = sturmChainExact(p);
    let as = ps.map(p => degree(p) % 2 === 0 ? eSign(p[0]) : -eSign(p[0]));
    let bs = ps.map(p => eSign(p[0]));
    return signChanges(as) - signChanges(bs);
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
    let ps = sturmChainExact(p);
    let as = ps.map(p => p[p.length - 1]); // evaluate at 0
    let bs = ps.map(p => expEvaluateAt1(p)); // evaluate at 1
    return expSignChanges(as) - expSignChanges(bs);
}
exports.numRootsIn01Exact = numRootsIn01Exact;
//# sourceMappingURL=num-roots.js.map