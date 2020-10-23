
import { eToDd as eToDd_ } from "big-float-ts";
import { twoSum as twoSum_ } from "big-float-ts";
import { eChangeVariablesLinear as eChangeVariablesLinear_ } from "../../change-variables/expansion/e-change-variables-linear";
import { allRootsCertified as allRootsCertified_ } from "./all-roots-certified";
import { RootInterval } from "./root-interval";
import { RootIntervalExp } from "./root-interval-exp";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const eChangeVariablesLinear = eChangeVariablesLinear_;
const allRootsCertified = allRootsCertified_;
const eToDd = eToDd_;
const twoSum = twoSum_;


const eps = Number.EPSILON;


/**
 * Returns once compensated root(s) (bar underflow / overflow) given a root 
 * interval previously calculated using `allRootsCertified`.
 * 
 * * 'once-compensated' here means that the typical root interval, `W`,
 * (`= Number.EPSILON` at `1`) is reduced to `W**2`; if multiple roots were
 * present in the original interval they may be resolved to individual 
 * intervals 
 * 
 * @param ri a root interval previously calculated
 * @param p the exact polynomial with coefficients given densely as an array of 
 * Shewchuk floating point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`
 */
function refineK1(
        ri: RootInterval, 
        p: number[][]): RootIntervalExp[] {

    const tS = ri.tS;

    // scale is exact by the precondition put on `RootInterval`
    const δ = ri.tE - tS;

    // Translate the polynomial such that the root is within δ from 0, then
    // scale it such that the roots stay <= 1, i.e. is in [0,1]
    const pExactK1 = eChangeVariablesLinear(p, δ, tS);

    // reduce the polynomial to double-double precision for faster root finding
    const pDdK1 = pExactK1.map(eToDd);

    // update the double-double precision error bound - it is simply the error 
    // in rounding the exact coefficients to double-double precision
    const errBoundK1 = pDdK1.map(
        c => eps*eps*c[1]
    );
    const getPExactK1 = () => pExactK1;

    const risLo = allRootsCertified(pDdK1, 0, 1, errBoundK1, getPExactK1);
    const ris: RootIntervalExp[] = [];
    for (let riLo of risLo) {
        ris.push({
            tS: twoSum(tS, riLo.tS * δ),
            tE: twoSum(tS, riLo.tE * δ),
            multiplicity: riLo.multiplicity
        });
    }

    return ris;
}


export { refineK1 }
