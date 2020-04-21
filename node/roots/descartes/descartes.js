"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sign_changes_1 = require("./sign-changes");
const change_variables_translate_x_1 = require("../../change-variables/change-variables-translate-x");
/**
 * Returns an upper bound of the number of *positive* real roots of the given
 * polynomial - this upper bound is always a multiple of two (i.e. 0, 2, etc)
 * higher than the actual number of real roots.
 * * the polynomial need not be square free
 */
function expDescartes(p) {
    return sign_changes_1.expSignChanges(p);
}
exports.expDescartes = expDescartes;
/**
 * Returns an upper bound of the number of real roots of the given polynomial
 * in (0,a) - this upper bound is always a multiple of two (i.e. 0, 2, etc)
 * higher (or lower?) than the actual number of real roots.
 * * note that that the interval is *open*, thus it may be advisable to check
 * for roots at 0 and a before calling this function
 * * the polynomial need not be square free
 */
function expDescartesFrom0ToA(p, a) {
    let p_ = change_variables_translate_x_1.changeVariablesTranslateXExactExp(p, a);
    return sign_changes_1.expSignChanges(p) - sign_changes_1.expSignChanges(p_);
}
exports.expDescartesFrom0ToA = expDescartesFrom0ToA;
//# sourceMappingURL=descartes.js.map