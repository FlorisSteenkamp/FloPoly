/**
 * Returns the result of elevating the given polynomial by the given degree.
 *
 * @param p
 * @param deg
 *
 * @internal
 */
function bElevateDegree(p, deg) {
    const p_ = p.slice();
    for (let i = 0; i < deg; i++) {
        p_.push(0n);
    }
    return p_;
}
export { bElevateDegree };
//# sourceMappingURL=b-elevate-degree.js.map