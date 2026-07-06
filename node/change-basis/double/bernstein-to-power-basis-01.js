import { binomial } from "../../util/double/binomial.js";
/**
 * Returns the power basis representation from the given
 * Bernstein (in [0,1]) basis.
 *
 * * intermediate calculations are done in double precision
 *
 * @param p
 *
 */
function bernsteinToPowerBasis01(p) {
    const n = p.length - 1;
    if (n >= 4) {
        // Power coefficients by degree in ascending order: c[i] for x^i.
        const c = new Array(n + 1).fill(0);
        for (let i = 0; i <= n; i++) {
            let s = 0;
            for (let j = 0; j <= i; j++) {
                const sign = ((i - j) % 2) === 0 ? 1 : -1;
                s += sign * binomial(i, j) * p[j];
            }
            c[i] = binomial(n, i) * s;
        }
        // Convert ascending-by-degree to dense descending power basis.
        return c.reverse();
    }
    if (n === 3) {
        const [x0, x1, x2, x3] = p;
        return [
            (x3 - x0) + 3 * (x1 - x2),
            3 * ((x2 + x0) - 2 * x1),
            3 * (x1 - x0),
            x0
        ];
    }
    if (n === 2) {
        const [x0, x1, x2] = p;
        return [(x2 + x0) - 2 * x1, 2 * (x1 - x0), x0];
    }
    if (n === 1) {
        const [x0, x1] = p;
        return [x1 - x0, x0];
    }
    return p;
}
export { bernsteinToPowerBasis01 };
//# sourceMappingURL=bernstein-to-power-basis-01.js.map