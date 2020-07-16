
import { hornerWithRunningError as hornerWithRunningError_ } from "./horner-with-running-error";
import { CompHornerK as CompHornerK_ } from "./comp-horner-k";
import { compHornerWithRunningError as compHornerWithRunningError_ } from "./comp-horner-with-running-error";
import { quadSplit as quadSplit_ } from "./quad-split";
import { γs as γs_ } from "./gammas";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const γs = γs_;
const quadSplit = quadSplit_;
const hornerWithRunningError = hornerWithRunningError_;
const CompHornerK = CompHornerK_;
const compHornerWithRunningError = compHornerWithRunningError_;



type TEval = {
    /** An estimate */
    r̂: number;
    /** The level of effort that was required to calculate the sign */
    level: number;
}


/**
 * Returns the result of evaluating the given polynomial at x and a level that
 * indicates the difficulty of attaining the correct sign.
 * * polynomial coefficients must be given in quad precision
 * @param p a polynomial
 * @param x an evaluation point
 */
function quadEvalK1(p: number[][], x: number): TEval {
    let [p1, p2] = quadSplit(p);
    let [r̂1, e1] = hornerWithRunningError(p1, x);
    let [r̂2, e2] = hornerWithRunningError(p2, x);

    let r̂ = r̂1 + r̂2;
    
    if (Math.abs(r̂*(1-γs[1])) - (e1 + e2)*(1+γs[1]) < 0) {
        return quadEvalK2(p, x);
    }
    return {
        r̂,
        level: 1
    }
}


function quadEvalK2(p: number[][], x: number): TEval {
    let [p1, p2] = quadSplit(p);
    let [r̂1, e1] = compHornerWithRunningError(p1, x);
    let [r̂2, e2] = compHornerWithRunningError(p2, x);

    let r̂ = r̂1 + r̂2;
    
    if (Math.abs(r̂*(1-γs[1])) - (e1 + e2)*(1+γs[1]) < 0) {
        return quadEvalK4(p, x);
    }

    return {
        r̂,
        level: 2
    }
}


function quadEvalK4(p: number[][], x: number): TEval {
    let [p1, p2] = quadSplit(p);
    let r̂1 = CompHornerK(p1, x, 4);
    let r̂2 = CompHornerK(p2, x, 3);

    let r̂ = r̂1 + r̂2;

    return {
        r̂,
        level: 4
    }
}


export { quadEvalK1, quadEvalK2, quadEvalK4 }
