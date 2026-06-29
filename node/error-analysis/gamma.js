const eps = Number.EPSILON;
const u = Number.EPSILON / 2;
const uu = u * u;
const γ1 = γ(1);
const γγ3 = γγ(3);
/**
 * The canonical floating point error function, γ.
 *
 * * very close to being `=== n * (Number.EPSILON / 2)`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this `=== 2*d + 1`, where `d` is the degree of the
 * polynomial
 *
 * @doc
 */
function γ(n) {
    const nu = n * u;
    return nu / (1 - nu);
}
/**
 * The canonical, once compensated (implying double-double precision),
 * floating point error function.
 *
 * * roughly `=== n * (Number.EPSILON / 2)**2`
 * * see e.g. [Algorithms for Accurate, Validated and Fast Polynomial Evaluation](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * @param n the parameter - typically a small positive integer, e.g. for
 * polynomial evaluation this === 2*d + 1, where d is the degree of the
 * polynomial
 *
 * @doc
 */
function γγ(n) {
    const nuu = n * uu;
    return nuu / (1 - nuu);
}
// cache some standard error bound units
const _γs = new Array(20).fill(0).map((_, i) => γ(i));
/** @internal */
function γs(n) {
    return _γs[n] || γ(n);
}
export { γ, γγ, γs, γ1, γγ3, u, uu, eps };
//# sourceMappingURL=gamma.js.map