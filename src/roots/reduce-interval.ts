import { Horner } from "../evaluate/double/horner.js";
import { negativeRootLowerBound_LMQ_WithError } from "./root-bounds/lmq/negative-root-lower-bound-lmq-with-err.js";
import { positiveRootUpperBound_LMQ_WithError } from "./root-bounds/lmq/positive-root-upper-bound-lmq-with-err.js";
import { γ1 } from "../error-analysis/gamma.js";


const { min, max, abs } = Math;

const MAX_DOUBLE = 1.7976931348623157e+308;


/**
 * Returns the result of reducing the given interval [lb,ub] to a potentially
 * smaller interval that still contains all the roots of the given polynomial.
 *
 * * the interval is reduced only if the current interval is infinite in either
 *   direction
 *
 * * the absolute coefficient-wise error bound used for the root bounds is
 *   `pDd_[i]*errorMultiplier + |p[i]|*γ1`, i.e. the given error bound (of the
 *   double-double precision polynomial) *plus* the round-off incurred when
 *   the double-double precision coefficients were rounded to the double
 *   precision coefficients `p` (which is at most half an ulp, i.e. `u|p[i]|`
 *   with `u <= γ1`); without the latter the family of polynomials for which
 *   the root bounds are calculated would not provably contain the exact
 *   polynomial
 *
 * @param lb
 * @param ub
 * @param p the polynomial with coefficients given as double precision
 * floating point numbers rounded from the double-double precision coefficients
 * @param pDd_ the coefficient-wise error bound of the double-double precision
 * polynomial that still needs to be multiplied by `errorMultiplier` to get
 * the actual absolute error bound
 * @param errorMultiplier the multiplier of `pDd_` to get the actual absolute
 * error bound, e.g. `γγ3` or `1`
 *
 * @internal
 */
function reduceInterval(
        lb: number,
        ub: number,
        p: number[],
        pDd_: number[],
        errorMultiplier: number) {

    const p_ = pDd_.map((E,i) => E*errorMultiplier + abs(p[i])*γ1);

    lb = max(lb, negativeRootLowerBound_LMQ_WithError(p, p_));
    ub = min(ub, positiveRootUpperBound_LMQ_WithError(p, p_));

    const d = p.length - 1;

    const F = 2**(-2*d);

    if (!Number.isFinite(lb)) {
        lb = -F*MAX_DOUBLE;
    }
    if (!Number.isFinite(ub)) {
        ub = F*MAX_DOUBLE;
    }

    while (true) {
        const lb_ = abs(Horner(p, lb));
        const ub_ = abs(Horner(p, ub));

        if (lb_ > F*MAX_DOUBLE) {
            lb /= 2;
            continue;
        }

        if (ub_ > F*MAX_DOUBLE) {
            ub /= 2;
            continue;
        }

        break;
    }

    return [lb, ub];
}


export { reduceInterval }
