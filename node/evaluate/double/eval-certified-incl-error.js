"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalCertifiedInclError = void 0;
const eft_horner_1 = require("./eft-horner");
const horner_with_running_error_1 = require("./horner-with-running-error");
const horner_1 = require("./horner");
const abs_horner_1 = require("./abs-horner");
const gamma_1 = require("../../error-analysis/gamma");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const γ = gamma_1.γ;
const EFTHorner = eft_horner_1.EFTHorner;
const hornerWithRunningError = horner_with_running_error_1.hornerWithRunningError;
const Horner = horner_1.Horner;
const AbsHorner = abs_horner_1.AbsHorner;
const γ1 = γ(1);
const γ2 = γ(2);
/**
 * Returns the result of evaluating the given polynomial (with specified
 * coefficient-wise error bounds) at x such that the sign is correct when
 * positive or negative and undecided when 0 - an additional `multiplier`
 * parameter can enforce additional bits (beyond the sign bit) to be correct.
 *
 * * designed to be fast in 'easy' cases (say condition number < 2**53) and
 * harder cases (condition number < 2**106) since nearly all typical
 * calculations will have condition number < 2**106
 * * a staggered approach is used - first double precision, then simulated
 * double-double precision (i.e. once compensated Horner evluation) is tried
 * before giving up and returning 0 - see point below
 * * if zero is returned then the calculated result is too close to 0 to
 * determine the sign; the caller of this function can then resort to a more
 * accurate (possibly exact) evaluation
 * * the error is also returned; if not required then use
 * `evalK1MultiWithErrBounds` instead
 *
 * @param p an array of 2 polynomials with coefficients given densely as an
 * array of double precision floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`;
 * the first polynomial's coefficients represent the 'high part' (a double) of a
 * double-double precision value, while the second polynomial's coefficients
 * represent the 'low part', i.e. designating `hp` for high part and `lp` for
 * low part it must be that they are non-overlapping -> `twoSum(lp,hp)` will
 * equal [lp,hp]`; put another way, if the given polynomial is given as e.g. a
 * linear polynomial with coefficients in double precision,
 * e.g. `[[1.7053025658242404e-13, 2354.33721613], [-7.105427357601002e-15,284.5673337]]`
 * then this parameter, `p`, should be `[[2354.33721613], 284.5673337], [1.7053025658242404e-13, -7.105427357601002e-15]]`
 * which is simply the result of transposing the original polynomial if it is
 * seen as a matrix
 * @param pE defaults to `undefined`; an error polynomial that provides a
 * coefficientwise error bound on the input polynomial; all coefficients must
 * be positive; if undefined then the input polynomial will be assumed exact
 * @param x defaults to 0; the value at which to evaluate the polynomial
 * @param multiplier defaults to 1; the final calculation error needs to be a
 * multiple of this number smaller than the evaluated value, otherwise zero is
 * returned - useful if not only the sign is important but also some bits, e.g.
 * if multiplier = 8 then 3 bits will have to be correct otherwise 0 is returned
 */
function evalCertifiedInclError(p, x, pE = undefined, multiplier = 1) {
    const absX = Math.abs(x);
    // first do a fast evaluation
    const [r, e1] = hornerWithRunningError(p[0], x);
    // the line below was changed due to negative values of x now also allowed
    const e2 = γ2 * AbsHorner(p[0], absX); // the error due to not considering p[1]
    // error due to imprecision in coefficients
    // the line below was changed due to negative values of x now also allowed
    //const E = pE ? Horner(pE, x) : 0; 
    const E = pE
        ? Horner(pE, absX)
        : 0;
    const ee = e1 + e2 + E; // in difficult cases E can be larger than e1+e2
    if (ee * multiplier < Math.abs(r)) {
        // we are within bounds
        return { r̂: r, e: ee };
    }
    // error is too large - do a more precise evaluation
    let { r̂, pπ, pσ } = EFTHorner(p[0], x);
    const [C1, c1] = hornerWithRunningError(pπ, x);
    const [C2, c2] = hornerWithRunningError(pσ, x);
    const [C3, c3] = hornerWithRunningError(p[1], x);
    let e = (c1 + c2 + c3) + E; // typically: c1,c2 < c3 < E
    r̂ = (C1 + C2 + C3) + r̂; // typically: C1,C2 < C3 < r̂ and (C1 + C2 + C3 < r̂)
    e += γ1 * r̂;
    if (e * multiplier < Math.abs(r̂)) {
        return { r̂, e };
    }
    // error is still too large to return the correct sign (if multiplier === 1)
    return { r̂: 0, e };
}
exports.evalCertifiedInclError = evalCertifiedInclError;
//# sourceMappingURL=eval-certified-incl-error.js.map