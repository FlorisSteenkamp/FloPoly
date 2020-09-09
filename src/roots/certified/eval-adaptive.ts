
import { evalCertified as evalCertified_ } from "../../evaluate/double/eval-certified";
import { eHorner as HornerExact_ } from "../../evaluate/expansion/e-horner";
import { eEstimate as eEstimate_ } from 'big-float-ts';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const evalCertified = evalCertified_;
const HornerExact = HornerExact_;
const eEstimate = eEstimate_;


/**
 * Returns the result of evaluating the given polynomial (with double-double
 * precision coefficients) at the given value, where the coefficient-wise error 
 * is also given. 
 * 
 * * **the sign of the returned result is guaranteed to be correct**
 * * the evaluation is done adaptively, i.e. if the evaluation cannot be done
 * accurately enough then an exact precision polynomial is requested
 * 
 * @internal
 * 
 * @param p a polynomial (with double-double precision coefficients)
 * @param pE a coefficientwise error bound
 * @param x the point of evaluation
 * @param psExact an object holding the exact polynomial and all its exact 
 * derivatives - this object may be modified!
 * @param getPsExact a function to retrieve the exact polynomial and all its 
 * exact derivatives
 * @param diffCount the number of differentiations done up to this point
 */
function evalAdaptive(
        p: number[][], 
        pE: number[], 
        x: number, 
        psExact: { ps: number[][][] },
        getPsExact: () => number[][][],
        diffCount: number) {

    let r = evalCertified(p, pE, x, 4);
    if (r !== 0) { return r; }

    // condition number is too high - request higher precision
    psExact.ps = psExact.ps || getPsExact();
    return eEstimate(HornerExact(psExact.ps[diffCount],x));
}


export { evalAdaptive }
