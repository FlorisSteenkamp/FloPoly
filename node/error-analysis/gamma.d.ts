declare const eps: number;
declare const u: number;
declare const uu: number;
declare const γ1: number;
declare const γγ3: number;
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
declare function γ(n: number): number;
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
declare function γγ(n: number): number;
/** @internal */
declare function γs(n: number): number;
export { γ, γγ, γs, γ1, γγ3, u, uu, eps };
