import { bMod } from "../../gcd/bigint/b-mod.js";
import { bXgcd } from "../../gcd/bigint/b-xgcd.js";
/**
 * Returns the multiplicative inverse of `a` modulo `p`, i.e. the `x` in
 * `[0,p)` such that `a*x ≡ 1 (mod p)`.
 *
 * * **precondition:** `a` and `p` must be coprime (e.g. `p` is prime and
 *   `a` is not a multiple of `p`), else the result is meaningless
 *
 * * see also the function `bXgcd`
 *
 * @param a
 * @param p the modulus
 *
 * @example
 * ```typescript
 * bInverseModP(3n, 11n);  //=> 4n  (since 3*4 = 12 ≡ 1 (mod 11))
 * bInverseModP(2n, 5n);   //=> 3n
 * ```
 *
 * @doc
 */
function bInverseModP(a, p) {
    // the Bezout coefficient `x` in `a*x + p*y = gcd(a,p) = 1`
    return bMod(bXgcd(a, p).x, p);
}
export { bInverseModP };
//# sourceMappingURL=b-inverse-mod-p.js.map