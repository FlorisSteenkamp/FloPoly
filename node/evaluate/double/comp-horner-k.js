import { SumK as SumK_ } from "./sum-k.js";
import { EFTHornerK as EFTHornerK_ } from "./eft-horner-k.js";
import { Horner as Horner_ } from "./horner.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const SumK = SumK_;
const EFTHornerK = EFTHornerK_;
const Horner = Horner_;
/**
 * Returns a result of evaluating a univariate polynomial using K times compensated
 * Horner's method.
 *
 * * K times compensated means the error in the evaluation is reduced by roughly
 * `(1 / Number.EPSILON)**K` which is again roughly `2^(53*K)` - it is the same as using
 * double-double-.... (K times) precision in a normal Horner evaluation
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, `Stef Graillat, Philippe Langlois, Nicolas Louvet`](https://hal.archives-ouvertes.fr/hal-00285603/document)
 * * for K-times compensated with K <= 4 this is the fastest known method, but
 * the running time grows exponentially with K.
 *
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 * @param K (K - 1) === the number of compensations to do
 *
 * @doc
 */
function CompHornerK(p, x, K) {
    K = Math.min(p.length - 1, K);
    const { hs, ps } = EFTHornerK(p, x, K);
    const leafStart = 2 ** (K - 1); // cardinality and start of the leaves
    for (let i = 0; i < leafStart; i++) {
        hs.push(Horner(ps[leafStart + i], x));
    }
    const r̄ = SumK(hs, K);
    return r̄;
}
export { CompHornerK };
//# sourceMappingURL=comp-horner-k.js.map