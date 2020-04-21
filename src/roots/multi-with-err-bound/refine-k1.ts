
import { toQuad, twoSum } from "flo-numerical";
import { RootInterval } from "./root-interval";
import { RootIntervalExp } from "./root-interval-exp";
import { changeVariablesLinearExact } from "../../change-variables/change-variables-linear";
import { differentiateExact } from "../../calculus/differentiate";
import { allRootsMultiWithErrBounds } from "./all-roots-multi-with-err-bounds";


const eps = Number.EPSILON;


/**
 * Returns once compensated root(s).
 * * **precondition** the root has multiplicity === 1
  * @param tS Start of root interval - there is assumed exactly 1 root from tS
 * to tS + 4 ulps.
 * @param getPsExact function returning psExact
 */
function refineK1(
        tS: number, 
        getPsExact: () => number[][][]): RootIntervalExp[] {

    // TODO - change to getPExact everywhere - dont always need all derivatives
    let psExact = getPsExact(); 
    let pExact = psExact[0];
    // 1/(4*Number.EPSILON) since the original root(s) are 4*Number.EPSILON 'accurate'
    let scale = 4*Number.EPSILON;
    // Translate the polynomial such that the root is within 4 eps from 0, then
    // scale it such that the roots stay < 1, i.e. is in [0,1]
    let pExactK1 = changeVariablesLinearExact(pExact, scale, tS);
    // reduce the polynomial to quad precision for faster root finding
    let pQuadK1 = pExactK1.map(toQuad);
    // update the quad precision error bound - it is simply the error in 
    // rounding the exact coefficients to quad precision
    let errBoundK1 = pQuadK1.map(c => eps*eps*c[1]);
    let getPsExactK1 = () => {
        let polyK1 = pExactK1;
        let psExactK1 = [polyK1];
        while (polyK1.length > 1) {
            polyK1 = differentiateExact(psExactK1[psExactK1.length-1]);
            psExactK1.push(polyK1);
        }

        return psExactK1;
    };

    let _risLo = allRootsMultiWithErrBounds(pQuadK1, errBoundK1, getPsExactK1);
    let ris: RootIntervalExp[] = [];
    for (let riLo of _risLo) {
        ris.push({
            tS: twoSum(tS, riLo.tS * 4*Number.EPSILON),
            tE: twoSum(tS, riLo.tE * 4*Number.EPSILON),
            multiplicity: riLo.multiplicity
        });
    }

    return ris;
    
    /*
    let risLo = allRootsMultiWithErrBounds(pQuadK1, errBoundK1, getPsExactK1);

    let rLoS = risLo[0].tS * 4*Number.EPSILON;
    let rLoE = risLo[0].tE * 4*Number.EPSILON;

    let r: RootIntervalExp = {
        tS: twoSum(tS,rLoS),
        tE: twoSum(tS,rLoE),
        multiplicity: 1
    }

    return [r];
    */
}


export { refineK1 }
