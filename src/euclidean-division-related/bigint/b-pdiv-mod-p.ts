import { bDegree } from "../../basic/bigint/b-degree.js";
import { bAdd } from "../../basic/bigint/b-add.js";
import { bMultiply } from "../../basic/bigint/b-multiply.js";
import { bRemoveLeadingZeros } from "../../basic/bigint/b-remove-leading-zeros.js";
import { bSubtract } from "../../basic/bigint/b-subtract.js";
import { bInverseModP } from "./b-inverse-mod-p.js";
import { bMod } from "../../gcd/bigint/b-mod.js";


function modPoly(p_: bigint[], p: bigint): bigint[] {
    return bRemoveLeadingZeros(p_.map(c => bMod(c, p)));
}


/**
 * Returns the `quotient` and `remainder` of the division of `a/b` (`a`, `b`
 * both being polynomials), i.e. performs Euclidean (i.e. long) division on
 * the two given polynomials, a/b, and returns `q` and `r` in the formula `a = bq + r`, 
 * where `degree(r) < degree(b)`.
 * 
 * * calculations are done in `ℤ_p`, i.e. modulo the prime `p`.
 * 
 * * **precondition:** `b !== []`, i.e. unequal to the zero polynomial.
 * 
 * * see [Polynomial long division](https://en.wikipedia.org/wiki/Polynomial_long_division)
 * 
 * @param a the polynomial `a` in the formula `a = bq + r`; the polynomial is given
 * with coefficients as a dense array of bigints from highest to lowest 
 * power, e.g. `[5n,-3n,0n]` represents the  polynomial `5x^2 - 3x`
 * @param b the polynomial `b` in the formula `a = bq + r`
 * 
 * @internal
 */
function bPdivModP(
        a: bigint[],
        b: bigint[],
        p: bigint): { q: bigint[]; r: bigint[]; } {

    let q: bigint[] = [];
    b = modPoly(b, p);
    const d = bDegree(b);
    const c = b[0];

    let r = modPoly(a, p);
    while (true) {
        const deg = bDegree(r) - d;
        if (deg < 0) { 
            return { q, r }; 
        }

        // multiplicative inverse of leading coefficient of b
        const lcBInv = bInverseModP(c, p); 
        const s = [bMod(r[0] * lcBInv, p), ...Array(deg).fill(0n)];
        q = modPoly(bAdd(q, s), p);
        r = modPoly(bSubtract(r, bMultiply(s, b)), p);
    }
}


export { bPdivModP }


// Quokka tests
// bPdivModP([1n, 0n, 1n], [1n, 1n], 5n);  /*?*/  // => { q: [1n, 4n], r: [2n] }
// bPdivModP([1n, 2n, 3n], [1n, 1n], 5n);  /*?*/  // => { q: [1n, 1n], r: [2n] }
// bPdivModP(
//     bMultiply([1000n, 2000n, 3000n], [1234n, 5678n])
//     .map(c => bMod(c, 101n)), [1234n, 5678n], 101n
// );  /*?*/  // => { q: [91n, 81n, 71n], r: [] }
// bPdivModP([1n, 0n, -1n], [1n, -1n], 5n);  /*?*/  // => { q: [1n, 1n], r: [] }

