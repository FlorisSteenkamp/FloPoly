"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.γγ = exports.γ = void 0;
const u = Number.EPSILON / 2;
const uu = u * u;
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
//# sourceMappingURL=gamma.js.map