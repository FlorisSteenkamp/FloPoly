/**
 * Generates and returns an array of polynomials with random **roots** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatRootsArr(2,3,0,10); //=> [[1, -17.445259802043438, 96.94898590669898, -172.1346546982741], [1, -21.424386776052415, 143.23055474890413, -283.0801374912826]]
 * flatRootsArr(2,3,0,10); //=> [[1, -17.445259802043438, 96.94898590669898, -172.1346546982741], [1, -21.424386776052415, 143.23055474890413, -283.0801374912826]]
 * ```
 *
 * @doc
 */
declare const flatRootsArr: (n: number, d: number, a?: number, b?: number, seed?: number, odds?: number) => number[][];
/**
 * Generates and returns an array of polynomials with random **coefficients** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * the exact same polynomials will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param n the number of polynomials to generate.
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds ignored (there are no roots to duplicate) - only present for
 * signature compatibility with [[flatRootsArr]]
 *
 * @example
 * ```typescript
 * flatCoefficientsArr(2,3,-2,2);//=> [[0.17491660453379154, -0.43646731972694397, 1.2396546360105276], [1.6841425858438015, -0.5817447584122419, 1.4673568829894066]]
 * flatCoefficientsArr(2,3,-2,2); //=> [[0.17491660453379154, -0.43646731972694397, 1.2396546360105276], [1.6841425858438015, -0.5817447584122419, 1.4673568829894066]]
 * ```
 *
 * @doc
 */
declare const flatCoefficientsArr: (n: number, d: number, a?: number, b?: number, seed?: number, odds?: number) => number[][];
/**
 * Returns a quasi-random number to be used as the next input to this function.
 *
 * * see [stackoverflow](https://stackoverflow.com/questions/3062746/special-simple-random-number-generator)
 *
 * @param seed
 *
 * @internal
 */
declare function predictiveRandom(seed: number): number;
/**
 * Generates and returns a polynomial with random **roots** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed valuethat can be used as the input to the next
 * call to a predictive random function
 *
 * * all roots will approximate real values so is not at all representative of
 * a natural random root distribution
 *
 * * the exact same polynomial will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the degree of the polynomials
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 *
 * @example
 * ```typescript
 * flatRoots(3,0,10); //=> { p: [1, -17.445259802043438, 96.94898590669898, -172.1346546982741], seed: 3658815999 }
 * ```
 *
 * @doc
 */
declare function flatRoots(d: number, a?: number, b?: number, seed?: number, odds?: number): {
    p: number[];
    seed: number;
};
/**
 * Generates and returns a polynomial with random **coefficients** (with coefficients
 * given densely as an array of double floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`).
 *
 * * also returns a new seed valuethat can be used as the input to the next
 * call to a predictive random function
 *
 * * the exact same polynomial will be created on each call to this function
 * if the same seed is used; this is by design to improve testing.
 *
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 *
 * @example
 * ```typescript
 * flatCoefficients(3,-5,5);//=> { p: [0.43729151133447886, -1.09116829931736, 3.099136590026319], seed: 3658815999 }
 * ```
 *
 * @doc
 */
declare function flatCoefficients(d: number, a?: number, b?: number, seed?: number): {
    p: number[];
    seed: number;
};
export { flatRoots, flatRootsArr, flatCoefficients, flatCoefficientsArr, predictiveRandom };
