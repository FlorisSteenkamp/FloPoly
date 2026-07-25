/**
 * Returns an LMQ upper bound for positive real roots using a conservative
 * polynomial representative formed from coefficient-wise absolute errors.
 *
 * Strict mode:
 * if coefficient sign uncertainty implies that, for some potentially negative
 * coefficient, there is no guaranteed positive coefficient of higher power,
 * then no finite LMQ-style bound can be guaranteed and `Infinity` is returned.
 *
 * @param p polynomial coefficients from highest to lowest power
 * @param p_ coefficient-wise absolute error bounds
 *
 * @doc
 */
declare function positiveRootUpperBound_LMQ_WithError(p: number[], p_: number[]): number;
export { positiveRootUpperBound_LMQ_WithError };
