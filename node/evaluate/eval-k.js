"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalK4 = exports.evalK2 = exports.evalK1 = void 0;
const horner_with_running_error_1 = require("./horner-with-running-error");
const comp_horner_k_1 = require("./comp-horner-k");
const comp_horner_with_running_error_1 = require("./comp-horner-with-running-error");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const hornerWithRunningError = horner_with_running_error_1.hornerWithRunningError;
const CompHornerK = comp_horner_k_1.CompHornerK;
const compHornerWithRunningError = comp_horner_with_running_error_1.compHornerWithRunningError;
/**
 * Returns the result of evaluating the given polynomial at x such that at least
 * the sign bit is guaranteed correct.
 * @param p a polynomial
 * @param x an evaluation point
 */
function evalK1(p, x) {
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
exports.evalK1 = evalK1;
function evalK2(p, x) {
    let [r̂, e] = compHornerWithRunningError(p, x);
    if (Math.abs(r̂) - e < 0) {
        return evalK4(p, x);
    }
    return r̂;
}
exports.evalK2 = evalK2;
// inlined
//[r̂, e] = compHornerWithRunningError(p, x); if (Math.abs(r̂) - e < 0) { return evalK4(p, x); } return { r̂, level: 2 }
function evalK4(p, x) {
    let r̂ = CompHornerK(p, x, 4);
    return r̂;
}
exports.evalK4 = evalK4;
//# sourceMappingURL=eval-k.js.map