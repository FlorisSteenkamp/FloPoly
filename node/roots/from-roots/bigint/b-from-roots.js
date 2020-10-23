"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bFromRoots = void 0;
const b_multiply_1 = require("../../../basic/bigint/b-multiply");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const bMultiply = b_multiply_1.bMultiply;
/**
 * Constructs a polynomial from the given roots by multiplying out the
 * factors (x - root1)(x - root2)
 *
 * * currently, only integer roots are allowed
 *
 * @param roots an array of roots
 *
 * @example
 * fromRoots([1n,2n,3n,3n]); //=> [1n, -9n, 29n, -39n, 18n]
 */
function bFromRoots(roots) {
    let p = [1n];
    for (let i = 0; i < roots.length; i++) {
        p = bMultiply(p, [1n, -roots[i]]);
    }
    return p;
}
exports.bFromRoots = bFromRoots;
//# sourceMappingURL=b-from-roots.js.map