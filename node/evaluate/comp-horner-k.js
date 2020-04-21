"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum_k_1 = require("./sum-k");
const eft_horner_k_1 = require("./eft-horner.k");
const horner_1 = require("./horner");
/**
 * see https://hal.archives-ouvertes.fr/hal-00285603/document
 *
 * For K-times compensated with K <= 4 this is the fastest known method, but
 * grows exponentially with K.
 * @param p
 * @param x
 * @param K
 */
function CompHornerK(p, x, K) {
    K = Math.min(p.length - 1, K);
    let { hs, ps } = eft_horner_k_1.EFTHornerK(p, x, K);
    let leafStart = Math.pow(2, (K - 1)); // cardinality and start of the leaves
    for (let i = 0; i < leafStart; i++) {
        hs.push(horner_1.Horner(ps[leafStart + i], x));
    }
    let r̄ = sum_k_1.SumK(hs, K);
    return r̄;
}
exports.CompHornerK = CompHornerK;
//# sourceMappingURL=comp-horner-k.js.map