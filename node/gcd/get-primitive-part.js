"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_content_1 = require("./get-content");
/**
 * Returns the primitive part of the given polynomial.
 * * **precondition** p must have integer coefficients
 * @param p a polynomial
 */
function getPrimitivePart(p) {
    let c = get_content_1.getContent(p);
    let p_ = [];
    for (let i = 0; i < p.length; i++) {
        p_.push(p[i] / c);
    }
    return p_;
}
exports.getPrimitivePart = getPrimitivePart;
//# sourceMappingURL=get-primitive-part.js.map