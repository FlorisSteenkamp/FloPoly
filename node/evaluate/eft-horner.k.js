"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eft_horner_1 = require("./eft-horner");
function EFTHornerK(p, x, K) {
    let ps = [p];
    let hs = [];
    let card = (Math.pow(2, K)) - 1; // size of the tree, i.e. cardinality of the nodes
    for (let i = 0; i < card; i++) {
        let { r̂, pπ, pσ } = eft_horner_1.EFTHorner(ps[i], x);
        hs.push(r̂);
        ps.push(pπ);
        ps.push(pσ);
    }
    return { hs, ps: ps.slice(Math.pow(2, (K - 1))) };
}
exports.EFTHornerK = EFTHornerK;
//# sourceMappingURL=eft-horner.k.js.map