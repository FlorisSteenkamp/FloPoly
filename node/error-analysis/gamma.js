"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const u = Number.EPSILON / 2;
const uu = Math.pow((Number.EPSILON / 2), 2);
/**
 * The canonical floating point error function, γ.
 * see e.g. https://hal.archives-ouvertes.fr/hal-00285603/document
 *
 * * γ is multiplied by (1+u) since it is calculated in floating point so we
 * must ensure it is bigger than the real value.
 * @param k the parameter
 */
function γ(n) {
    let nu = n * u;
    return nu / (1 - nu);
}
exports.γ = γ;
function γγ(n) {
    let nuu = n * uu;
    return nuu / (1 - nuu);
}
exports.γγ = γγ;
const γ1 = γ(1);
exports.γ1 = γ1;
const γ2 = γ(2);
exports.γ2 = γ2;
const γ3 = γ(3);
exports.γ3 = γ3;
const γ4 = γ(4);
exports.γ4 = γ4;
const γ5 = γ(5);
exports.γ5 = γ5;
const γ6 = γ(6);
exports.γ6 = γ6;
const γ7 = γ(7);
exports.γ7 = γ7;
const γ8 = γ(8);
exports.γ8 = γ8;
const γ9 = γ(9);
exports.γ9 = γ9;
const γ10 = γ(10);
exports.γ10 = γ10;
const γ11 = γ(11);
exports.γ11 = γ11;
const γ12 = γ(12);
exports.γ12 = γ12;
const γ13 = γ(13);
exports.γ13 = γ13;
const γ14 = γ(14);
exports.γ14 = γ14;
const γ25 = γ(25);
const γ39 = γ(39);
const γγ1 = γγ(1);
exports.γγ1 = γγ1;
const γγ2 = γγ(2);
exports.γγ2 = γγ2;
const γγ3 = γγ(3);
exports.γγ3 = γγ3;
const γγ4 = γγ(4);
exports.γγ4 = γγ4;
const γγ5 = γγ(5);
exports.γγ5 = γγ5;
const γγ6 = γγ(6);
exports.γγ6 = γγ6;
const γγ7 = γγ(7);
exports.γγ7 = γγ7;
const γγ8 = γγ(8);
exports.γγ8 = γγ8;
const γγ9 = γγ(9);
exports.γγ9 = γγ9;
const γγ10 = γγ(10);
exports.γγ10 = γγ10;
const γγ11 = γγ(11);
exports.γγ11 = γγ11;
const γγ12 = γγ(12);
exports.γγ12 = γγ12;
const γγ13 = γγ(13);
exports.γγ13 = γγ13;
const γγ14 = γγ(14);
exports.γγ14 = γγ14;
//# sourceMappingURL=gamma.js.map