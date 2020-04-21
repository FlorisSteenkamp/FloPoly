"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const p_inf_norm_1 = require("../../norm/p-inf-norm");
/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's Theorem with
 * k = n.
 *
 * This function is fast but the bound is not tight.
 * @param p a polynomial.
 */
function rootMagnitudeUpperBound_rouche(p) {
    return 1 + (p_inf_norm_1.pInfNorm(p.slice(1)) / p[0]);
}
exports.rootMagnitudeUpperBound_rouche = rootMagnitudeUpperBound_rouche;
//# sourceMappingURL=root-magnitude-upper-bound-rouche.js.map