"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
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
        let [π, pi] = flo_numerical_1.twoProduct(r̂, x); // TODO - unroll all critical twoProduct and twoSum and fastTwoSums
        [σ, r̂] = flo_numerical_1.twoSum(pi, p[i]);
        // inlined
        //r̂ = pi + p[i]; let bv = r̂ - pi; σ = (pi - (x-bv)) + (p[i]-bv);
        pπ.push(π);
        pσ.push(σ);
    }
    return { r̂, pπ, pσ };
}
exports.EFTHorner = EFTHorner;
//# sourceMappingURL=eft-horner.js.map