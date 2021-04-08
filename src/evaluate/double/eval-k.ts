import { hornerWithRunningError as hornerWithRunningError_ } from "./horner-with-running-error";
import { CompHornerK as CompHornerK_ } from "./comp-horner-k";
import { compHornerWithRunningError as compHornerWithRunningError_ } from "./comp-horner-with-running-error";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const hornerWithRunningError = hornerWithRunningError_;
const CompHornerK = CompHornerK_;
const compHornerWithRunningError = compHornerWithRunningError_;


/**
 * Returns the result of evaluating the given polynomial at `x` such that at least
 * the sign bit is correct *up to 3-times compensated evaluation (K = 4)*, i.e. 
 * as if evaluating in double-double-double-double precision.
 * 
 * * uses a staggered algorithm, first trying in double precision, then in 
 * double-double and finally in double-double-double-double
 * 
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * 
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * 
 * @doc
 */
function evalK(p: number[], x: number) {
    const [r̂, e] = hornerWithRunningError(p, x);
    // inlined 
    //const r̂ = p[0]; const e = Math.abs(r̂) / 2; for (const i=1; i<p.length; i++) { r̂ = r̂*x + p[i]; e = Math.abs(x)*e + Math.abs(r̂); } e = Number.EPSILON * (2*e - Math.abs(r̂));

    if (Math.abs(r̂) - e < 0) {
        return evalK2(p, x);
        // inlined
        //[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }
    }

    return r̂;
}


function evalK2(p: number[], x: number) {
    const [r̂, e] = compHornerWithRunningError(p, x);

    if (Math.abs(r̂) - e < 0) {
        return evalK4(p, x);
    }

    return r̂;
}
// inlined
//[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }


function evalK4(p: number[], x: number) {
    const r̂ = CompHornerK(p, x, 4);

    return r̂;
}


export { evalK, evalK2, evalK4 }
