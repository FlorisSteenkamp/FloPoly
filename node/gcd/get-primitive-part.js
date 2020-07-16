"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimitivePart = void 0;
const get_content_1 = require("./get-content");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const getContent = get_content_1.getContent;
/**
 * Returns the primitive part of the given polynomial.
 * * **precondition** p must have integer coefficients
 * @param p a polynomial
 */
function getPrimitivePart(p) {
    let c = getContent(p);
    let p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(p[i] / c);
    }
    return p_;
}
exports.getPrimitivePart = getPrimitivePart;
//# sourceMappingURL=get-primitive-part.js.map