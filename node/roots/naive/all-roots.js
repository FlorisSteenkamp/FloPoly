import { differentiate as differentiate_ } from "../../calculus/double/differentiate.js";
import { Horner as Horner_ } from "../../evaluate/double/horner.js";
import { brentPoly as brentPoly_ } from "./brent-poly.js";
import { negativeRootLowerBound_LMQ as negativeRootUpperBound_LMQ_ } from "../root-bounds/root-bounds-lmq.js";
import { positiveRootUpperBound_LMQ as positiveRootUpperBound_LMQ_ } from "../root-bounds/root-bounds-lmq.js";
import { removeLeadingZeros as removeLeadingZeros_ } from "../../basic/double/remove-leading-zeros.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const differentiate = differentiate_;
const Horner = Horner_;
const brentPoly = brentPoly_;
const negativeRootUpperBound_LMQ = negativeRootUpperBound_LMQ_;
const positiveRootUpperBound_LMQ = positiveRootUpperBound_LMQ_;
const removeLeadingZeros = removeLeadingZeros_;
/**
 * Find and return all roots of the given polynomial in the given interval.
 *
 * * an empty array is returned for a constant or the zero polynomial
 *
 * * **non-exact:** roots are found 'naively' using double-precision arithmetic
 * and accuracy will thus depend on the condition number around the root - use
 * [[allRootsCertifiedSimplified]] or [[allRootsCertified]] instead if certified
 * root bounds are required (it is about 3x slower, but still very fast!)
 *
 * * close (where the definition of closeness depends on the condition
 * number) or multiple *even* roots can be returned as 0, 1 or more close
 * roots, whereas close or multiple *odd* roots are guaranteed to return *at
 * least 1 root*
 *
 * * optimized for polynomials of degree 1 to about 30
 *
 * * roots are refined using the celebrated Brent's Method (and evaluated using
 * Horner's Method) until a root interval is found with
 * width `<= eps * max(1, 2^⌈log₂r⌉)`, where `eps = Number.EPSILON` and
 * `r` is a root
 *
 * * **ordered:** the returned roots are ordered from lowest to highest
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param lb defaults to `Number.NEGATIVE_INFINITY`; lower bound of roots to be
 * returned
 * @param ub defaults to `Number.POSITIVE_INFINITY`; upper bound of roots to be
 * returned
 *
 * @doc
 */
function allRoots(p, lb = Number.NEGATIVE_INFINITY, ub = Number.POSITIVE_INFINITY) {
    // return an empty array for a constant or the zero polynomial
    if (p.length <= 1) {
        return [];
    }
    if (lb === Number.NEGATIVE_INFINITY) {
        lb = negativeRootUpperBound_LMQ(p);
    }
    if (ub === Number.POSITIVE_INFINITY) {
        ub = positiveRootUpperBound_LMQ(p);
    }
    p = removeLeadingZeros(p);
    //---- count and remove roots at zero
    let numZerosAtZero = 0;
    while (p[p.length - 1] === 0) {
        p = p.slice(0, -1);
        numZerosAtZero++;
    }
    //------------------------
    // Get all derivatives, i.e. 
    // ps === [p, dp, ddp, ..., constant]
    //        [0,  1,   2, ..., deg     ]
    const ps = [p];
    for (let i = 1; i <= p.length - 1; i++) {
        ps.push(differentiate(ps[i - 1]));
    }
    //const δ = Math.max(2*eps, 2*eps * Math.max(Math.abs(lb), Math.abs(ub)));
    /** root intervals */
    let is = [];
    // loop: ps[diffCount] === [linear, quadratic, ..., deg]
    for (let diffCount = p.length - 2; diffCount >= 0; diffCount--) {
        // Get roots within intervals:
        // ---------------------------
        // Finds and returns all roots of the given polynomial within the given 
        // intervals, starting from the lower bound (lb) and ending at the upper
        // bound (ub)
        const p = ps[diffCount];
        const roots = [];
        let _a_ = lb;
        let _A_ = Horner(p, _a_);
        // if lower bound value is zero and this is the last iteration with 
        // p === the original polynomial then push the root at the lower bound
        if (_A_ === 0 && diffCount === 0) {
            roots.push(lb);
        }
        for (let i = 0; i < is.length; i++) {
            const _b_ = is[i];
            const _B_ = Horner(p, _b_);
            // if there is a root at the right interval then add it
            if (_B_ === 0) {
                roots.push(_b_);
            }
            else if (_A_ * _B_ < 0) {
                roots.push(brentPoly(p, _a_, _b_, _A_, _B_));
            }
            _a_ = _b_;
            _A_ = _B_;
        }
        const _B_ = Horner(p, ub);
        if (_A_ * _B_ < 0) {
            roots.push(brentPoly(p, _a_, ub, _A_, _B_));
        }
        // if upper bound value is zero and this is the last iteration with 
        // p === the original polynomial then push the root at the upper bound
        if (_B_ === 0 && diffCount === 0) {
            roots.push(ub);
        }
        is = roots;
    }
    if (numZerosAtZero > 0 && lb <= 0 && ub >= 0) {
        // at this point the existing intervals, `is`, are sorted
        // find the insertion spot and insert the zero roots to keep the roots
        // sorted
        let isWithZeroRoots = [];
        let zerosInserted = false;
        for (let i = 0; i < is.length; i++) {
            if (!zerosInserted && is[i] >= 0) {
                // push the zero roots
                for (let j = 0; j < numZerosAtZero; j++) {
                    isWithZeroRoots.push(0);
                }
                zerosInserted = true;
            }
            isWithZeroRoots.push(is[i]);
        }
        return isWithZeroRoots;
    }
    return is;
}
export { allRoots };
//# sourceMappingURL=all-roots.js.map