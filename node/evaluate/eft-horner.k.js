"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFTHornerK = void 0;
const eft_horner_1 = require("./eft-horner");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const EFTHorner = eft_horner_1.EFTHorner;
function EFTHornerK(p, x, K) {
    let ps = [p];
    let hs = [];
    let card = (Math.pow(2, K)) - 1; // size of the tree, i.e. cardinality of the nodes
    for (let i = 0; i < card; i++) {
        let { r̂, pπ, pσ } = EFTHorner(ps[i], x);
        hs.push(r̂);
        ps.push(pπ);
        ps.push(pσ);
    }
    return { hs, ps: ps.slice(Math.pow(2, (K - 1))) };
}
exports.EFTHornerK = EFTHornerK;
//# sourceMappingURL=eft-horner.k.js.map