
import { absCoeff } from "../basic/abs-coeff";
import { evaluateExact } from "../evaluate/evaluate-exact";
import { estimate } from "flo-numerical";


/**
 * Returns an accurate estimate of the condition number of the given polynomial.
 * * for testing purposes
 * @param p a polynomial
 */
function conditionNumber(p: number[], x: number) {
    let pN = absCoeff(p).map(x => [x]);
    let pD = p.map(x => [x]);

    let N = evaluateExact(pN, [x]);
    let D = evaluateExact(pD, [x]);

    return Math.abs(estimate(N) / estimate(D));
}


export { conditionNumber }
