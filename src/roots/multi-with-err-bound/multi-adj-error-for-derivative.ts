
import { γ } from "../../error-analysis/gamma";
const γ1 = γ(1);


/**
 * * precondition: deg(pE) <= 9
 * @param pE an error polynomial
 */
//function adjErrorForDerivativeQuad(
//        p: number[][],
//        pE: number[]) {
//
//    let result = [];
//
//    let d = pE.length - 1;
//    for (let i=0; i<d; i++) {
//        // if 1,2,4 or 8, etc. then no additional error occurs on multiply
//        // if 3,5,7 or 9, etc. then additional error occurs
//        let deg = d-i;
//        let oneOrPowerOf2 = (deg !== 6) && ((deg % 2 === 0) || (deg === 1));
//        let extraErr = oneOrPowerOf2 ? 0 : γγ1;
//        //γγ3
//        result.push(deg * (pE[i] + Math.abs(p[i][p[i].length-1])*extraErr));
//    }
//
//    return result;
//}


//export { adjErrorForDerivativeQuad }
