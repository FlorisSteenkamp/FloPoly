import { positiveRootUpperBound_LMQ } from "./positive-root-upper-bound-lmq.js";
import { toPolyForPositiveRootUpperBound_LMQ } from "./to-poly-for-positive-root-upper-bound-lmq.js";

const { abs } = Math;


/**
 * Returns an LMQ upper bound for positive real roots using a conservative
 * polynomial representative formed from coefficient-wise absolute errors.
 *
 * Strict mode:
 * if coefficient sign uncertainty implies that, for some potentially negative
 * coefficient, there is no guaranteed positive coefficient of higher power,
 * then no finite LMQ-style bound can be guaranteed and `Infinity` is returned.
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param p_ coefficient-wise absolute error bounds
 *
 * @doc
 */
function positiveRootUpperBound_LMQ_WithError(
        p: number[],
        p_: number[]): number {

    if (p.length !== p_.length) {
        throw new Error('`p` and `p_` must be of equal length.');
    }

    // Strict guard: if a potentially negative coefficient has no guaranteed
    // positive predecessor, only sign-uncertain positive predecessors, then
    // a finite LMQ bound cannot be guaranteed.
    for (let m=0; m<p.length; m++) {
        const em = abs(p_[m]);
        const minM = p[m] - em;
        if (minM >= 0) {
            continue;
        }

        let hasGuaranteedPositive = false;
        let hasUncertainPositive = false;
        for (let k=0; k<m; k++) {
            const ek = abs(p_[k]);
            const minK = p[k] - ek;
            const maxK = p[k] + ek;

            if (minK > 0) {
                hasGuaranteedPositive = true;
                break;
            }
            if (maxK > 0) {
                hasUncertainPositive = true;
            }
        }

        if (!hasGuaranteedPositive && hasUncertainPositive) {
            return Infinity;
        }
    }

    return positiveRootUpperBound_LMQ(
        toPolyForPositiveRootUpperBound_LMQ(p, p_)
    );
}


export { positiveRootUpperBound_LMQ_WithError }
