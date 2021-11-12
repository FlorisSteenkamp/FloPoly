import { allRootsCertified } from "./all-roots-certified.js";
function allRootsCertifiedSimplified(p, lb = Number.NEGATIVE_INFINITY, ub = Number.POSITIVE_INFINITY, returnUndefinedForZeroPoly) {
    return allRootsCertified(p.map(c => [0, c]), lb, ub, undefined, undefined, returnUndefinedForZeroPoly);
}
export { allRootsCertifiedSimplified };
//# sourceMappingURL=all-roots-certified-simplified.js.map