/**
 * Returns a string representing the given polynomial that is readable by a
 * human or a CAS (Computer Algebra System).
 *
 * * integer coefficients (including doubles with an integral value larger
 *   than `2^53`) are printed exactly (never in exponential notation)
 *
 * * non-integer double coefficients are printed as the *shortest* decimal
 *   that rounds to the same double (i.e. round-trip exact), never in
 *   exponential notation
 *
 * * **note:** if the polynomial coefficients are given as Shewchuk expansions
 *   then they are printed exactly if all expansion components are integers,
 *   else the coefficients are first down-converted to double precision
 *
 * @param p a polynomial (with coefficients given densely as an array of Shewchuk
 * floating point expansions **or** double precision floating point numbers **or**
 * bigints) from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * toCasStr([5,4,3,2,1]);           //=> " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1"
 * toCasStr([[5],[4],[3],[2],[1]]); //=> " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1"
 * toCasStr([5n,4n,3n,2n,1n]);      //=> " + 5*x^4 + 4*x^3 + 3*x^2 + 2*x + 1"
 * toCasStr([5,-4,0,2,-1]);         //=> " + 5*x^4 - 4*x^3 + 2*x - 1"
 * toCasStr([-1.5,0,2]);            //=> " - 1.5*x^2 + 2"
 * toCasStr([2**80, 1e-7]);         //=> " + 1208925819614629174706176*x + 0.0000001"
 * ```
 *
 * @doc
 */
declare function toCasStr(p: number[] | number[][] | bigint[]): string;
export { toCasStr };
