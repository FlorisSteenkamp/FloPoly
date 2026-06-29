import { allRootsCertified } from "./all-roots-certified.js";
function allRootsCertifiedSimplified(p, lb = -Infinity, ub = Infinity, returnUndefinedForZeroPoly) {
    return allRootsCertified(p.map(c => [0, c]), lb, ub, undefined, undefined, returnUndefinedForZeroPoly);
}
export { allRootsCertifiedSimplified };
//# sourceMappingURL=all-roots-certified-simplified.js.map