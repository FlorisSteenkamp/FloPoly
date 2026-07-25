/**
 * Returns a negative upper (closer to zero) bound of the real roots of the
 * given polynomial.
 *
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński,
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @doc
 */
declare const negativeRootUpperBound_LMQ_WithError: (p: number[], p_: number[]) => number;
export { negativeRootUpperBound_LMQ_WithError };
