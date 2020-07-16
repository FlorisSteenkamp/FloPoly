"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompHornerK = void 0;
const sum_k_1 = require("./sum-k");
const eft_horner_k_1 = require("./eft-horner.k");
const horner_1 = require("./horner");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const SumK = sum_k_1.SumK;
const EFTHornerK = eft_horner_k_1.EFTHornerK;
const Horner = horner_1.Horner;
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
    let { hs, ps } = EFTHornerK(p, x, K);
    let leafStart = Math.pow(2, (K - 1)); // cardinality and start of the leaves
    for (let i = 0; i < leafStart; i++) {
        hs.push(Horner(ps[leafStart + i], x));
    }
    let r̄ = SumK(hs, K);
    return r̄;
}
exports.CompHornerK = CompHornerK;
//# sourceMappingURL=comp-horner-k.js.map