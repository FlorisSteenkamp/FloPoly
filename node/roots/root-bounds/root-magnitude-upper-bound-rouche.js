"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootMagnitudeUpperBound_rouche = void 0;
const p_inf_norm_1 = require("../../norm/p-inf-norm");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const pInfNorm = p_inf_norm_1.pInfNorm;
/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's Theorem with
 * k = n.
 *
 * This function is fast but the bound is not tight.
 * @param p a polynomial.
 */
function rootMagnitudeUpperBound_rouche(p) {
    return 1 + (pInfNorm(p.slice(1)) / p[0]);
}
exports.rootMagnitudeUpperBound_rouche = rootMagnitudeUpperBound_rouche;
//# sourceMappingURL=root-magnitude-upper-bound-rouche.js.map