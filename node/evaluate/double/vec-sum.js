import { twoSum } from "big-float-ts";
/**
 * * helper function
 *
 * see http://www.ti3.tuhh.de/paper/rump/OgRuOi05.pdf
 *
 * @param x
 * @param K
 *
 * @internal
 */
function vecSum(p_) {
    const p = p_.slice();
    for (let i = 1; i < p.length; i++) {
        [p[i - 1], p[i]] = twoSum(p[i], p[i - 1]);
    }
    return p;
}
export { vecSum };
//# sourceMappingURL=vec-sum.js.map