
import { hornerWithRunningError as hornerWithRunningError_ } from "./horner-with-running-error";
import { CompHornerK as CompHornerK_ } from "./comp-horner-k";
import { compHornerWithRunningError as compHornerWithRunningError_ } from "./comp-horner-with-running-error";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const hornerWithRunningError = hornerWithRunningError_;
const CompHornerK = CompHornerK_;
const compHornerWithRunningError = compHornerWithRunningError_;


/**
 * Returns the result of evaluating the given polynomial at x such that at least
 * the sign bit is guaranteed correct.
 * @param p a polynomial
 * @param x an evaluation point
 */
function evalK1(p: number[], x: number) {
    let [r̂, e] = hornerWithRunningError(p, x);
    // inlined 
    //let r̂ = p[0]; let e = Math.abs(r̂) / 2; for (let i=1; i<p.length; i++) { r̂ = r̂*x + p[i]; e = Math.abs(x)*e + Math.abs(r̂); } e = Number.EPSILON * (2*e - Math.abs(r̂));

    if (Math.abs(r̂) - e < 0) {
        return evalK2(p, x);
        // inlined
        //[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }
    }

    return r̂;
}


function evalK2(p: number[], x: number) {
    let [r̂, e] = compHornerWithRunningError(p, x);

    if (Math.abs(r̂) - e < 0) {
        return evalK4(p, x);
    }

    return r̂;
}

// inlined
//[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }

function evalK4(p: number[], x: number) {
    let r̂ = CompHornerK(p, x, 4);

    return r̂;
}


export { evalK1, evalK2, evalK4 }
