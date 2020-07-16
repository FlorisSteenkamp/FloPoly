
import { hornerWithRunningError as hornerWithRunningError_ } from "./horner-with-running-error";
import { Horner as Horner_ } from "./horner";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const hornerWithRunningError = hornerWithRunningError_;
const Horner = Horner_;


/**
 * Returns the result of evaluating the given polynomial at x, and a level that
 * indicates the difficulty of attaining the correct sign.
 * * if zero is returned then the result was too close to 0 to evaluate accurately.
 * * **Level 1**: Do a simple Horner evaluation with running error bound and see
 * if the sign is definitely positive or negative, else goto level 2.
 * @param p a polynomial
 * @param pE an error polynomial - all coefficients must be positive
 * @param x an evaluation point
 */
function evalK1WithErrBounds(
        p: number[], 
        pE: number[],
        x: number) {

    let [r̂, e] = hornerWithRunningError(p, x);
    let E = Horner(pE, x);

    //if (temp) {
    //    console.log(toCasStr(p.map(c => c/(2**40))));
    //    console.log(toCasStr(pE.map(c => c/(2**40))));
    //    console.log('---');
    //    temp = false;
    //}

    // ------ console.log(e,E);
    // inlined 
    //let r̂ = p[0]; let e = Math.abs(r̂) / 2; for (let i=1; i<p.length; i++) { r̂ = r̂*x + p[i]; e = Math.abs(x)*e + Math.abs(r̂); } e = Number.EPSILON * (2*e - Math.abs(r̂));

    if (Math.abs(r̂) - (e + E) < 0) {
        // TODO!!! - just temp to check limits of accuracy possible (maybe not temp - this looks good)
        return 0; 
        //return evalK2(p, x);
        // inlined
        //[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }
    }

    return r̂;
}

/*
function evalK2(p: number[], x: number): TEval {
    let [r̂, e] = compHornerWithRunningError(p, x);

    if (Math.abs(r̂) - e < 0) {
        return evalK4(p, x);
    }

    return { r̂, level: 2 };
}


function evalK4(p: number[], x: number): TEval {
    let r̂ = CompHornerK(p, x, 4);

    return { r̂, level: 4 };
}*/


export { evalK1WithErrBounds/*, evalK2, evalK4*/ }
