import { changeVariablesLinear } from "../../change-variables/double/change-variables-linear.js";
import { powerToBernsteinBasis01 } from "./power-to-bernstein-basis-01.js";


/**
 * Returns the Bernstein basis representation on the interval `[a,b]` from
 * the given power (monomial) basis.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param a the lower bound of the Bernstein basis interval (default `0`)
 * @param b the upper bound of the Bernstein basis interval (default `1`)
 *
 * @doc
 */
function powerToBernsteinBasis(
        p: number[],
        a = 0,
        b = 1): number[] {

    if (p.length <= 1) {
        return p.slice();
    }

    // Substitute x = a + (b - a)*t so that t in [0,1] corresponds to x in [a,b].
    const q = changeVariablesLinear(p, b - a, a);

    return powerToBernsteinBasis01(q);
}


export { powerToBernsteinBasis }
