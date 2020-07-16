"use strict";
//import { twoProduct, twoSum } from "big-float-ts";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFTHorner = void 0;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { twoSum, twoProduct } = big_float_ts_1.operators;
/**
 * Returns an EFT (error free transformation) for the Horner evaluation of a
 * polymial at a specified x.
 * see https://hal.archives-ouvertes.fr/hal-00107222/document
 * (Faithful Polynomial Evaluation with Compensated Horner Algorithm)
 * Philippe Langlois, Nicolas Louvet. Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f
 */
function EFTHorner(p, x) {
    let pπ = []; // A polynomial containing part of the error
    let pσ = []; // Another polynomial containing part of the error
    let σ;
    let r̂ = p[0];
    for (let i = 1; i < p.length; i++) {
        let [π, pi] = twoProduct(r̂, x); // TODO - unroll all critical twoProduct and twoSum and fastTwoSums
        [σ, r̂] = twoSum(pi, p[i]);
        // inlined
        //r̂ = pi + p[i]; let bv = r̂ - pi; σ = (pi - (x-bv)) + (p[i]-bv);
        pπ.push(π);
        pσ.push(σ);
    }
    return { r̂, pπ, pσ };
}
exports.EFTHorner = EFTHorner;
//# sourceMappingURL=eft-horner.js.map