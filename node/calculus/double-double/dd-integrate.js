import { ddDivDouble } from 'double-double';
import { ddRemoveLeadingZeros } from '../../basic/double-double/dd-remove-leading-zeros.js';
/**
 * Returns the result of integrating the given polynomial in double-double
 * precision.
 *
 * * leading zero coefficients (e.g. if the zero polynomial is integrated
 *   with a zero constant of integration) are removed from the result
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double-double precision floating point numbers from highest to lowest
 * power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`
 * @param c the constant of intergration
 *
 * @example
 * ```typescript
 * ddIntegrate([[0,3], [0,2], [0,1]], [0,5]); //=> [[0,1], [0,1], [0,1], [0,5]]
 * ddIntegrate([], [0,0]);                    //=> []
 * ```
 *
 * @doc
 */
function ddIntegrate(p, c) {
    const d = p.length - 1;
    const r = new Array(d + 2);
    for (let i = 0; i < d + 1; i++) {
        r[i] = ddDivDouble(p[i], (d + 1 - i));
    }
    r[d + 1] = c;
    return ddRemoveLeadingZeros(r);
}
export { ddIntegrate };
//# sourceMappingURL=dd-integrate.js.map