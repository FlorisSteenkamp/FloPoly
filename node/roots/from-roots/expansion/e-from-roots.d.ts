/**
 * Constructs a double-double precision polynomial from the given roots by
 * multiplying out the factors `(x - root1)(x - root2)` in Shewchuck expansions
 * and rounding back to double-double precision.
 *
 * Returns an object with the following properties:
 *   - `pE`: a the Shewchuck expansion polynomial
 *   - `pDd`: a double-double precision polynomial (that is the expansion polynomial with *truncated* coefficients)
 *   - `pDd_`: the coefficient-wise error polynomial on `pDd` (**not** scaled by `γγ(3)` yet)
 *   - `p`: a double precision polynomial (that is the expansion polynomial with *rounded* coefficients)
 *   - `p_`: the coefficient-wise error polynomial on `p` (**not** scaled by `γ(1)` yet)
  *
 * * mostly for testing purposes.
 *
 * @param roots an array of roots as Shewchuk expansions,
 * e.g. `[[0.5],[0.3]]` represents the roots `0.5` and `0.3`
 *
 * @doc
 */
declare function eFromRoots(roots: number[][]): {
    pE: number[][];
    pDd: number[][];
    pDd_: number[];
    p: number[];
    p_: number[];
};
export { eFromRoots };
