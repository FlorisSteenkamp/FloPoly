/**
 * Applies a Mobius transformation to the given polynomial:
 * * `p(x) -> (x + 1)^n * p((ax + b) / (x + 1))`
 * * see e.g. https://arxiv.org/pdf/1605.00410.pdf equation (2)
 *
 * * uses double precision internally
 *
 * * Runs in `O(n^2)` arithmetic operations (where `n` is the degree) by
 *   decomposing the Mobius map into elementary steps, rather than the `O(n^3)`
 *   of expanding and summing `Σ cᵢ (ax + b)^i (x + 1)^(n-i)` directly.
 *
 * * The decomposition (see https://math.stackexchange.com/questions/694565)
 *   uses the identity `(ax + b)/(x + 1) = a + (b - a)/(x + 1)`, which yields
 *   `(x + 1)^n * p((ax + b)/(x + 1)) = S₁( R( Scₐ₋ᵦ( Sₐ(p) ) ) )`
 *
 *   where
 *     - `Sₕ(f) = f(x + h)`           is a Taylor shift (`O(n^2)`),
 *     - `Sc_s(f)` scales the coefficient of `xⁱ` by `sⁱ` (`O(n)`),
 *     - `R(f)` reverses the coefficient array, i.e. `xⁿ f(1/x)` (`O(n)`).
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a lower bound of the interval
 * @param b upper bound of the interval
 */
declare function mobius(p: number[], a: number, b: number): number[];
export { mobius };
