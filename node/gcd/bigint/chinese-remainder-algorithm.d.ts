/**
 * Combines the two congruences `x ≡ r1 (mod m1)` and `x ≡ r2 (mod m2)` and
 * returns the least nonnegative solution modulo `m1*m2`.
 *
 * * **precondition:** `m1` and `m2` must be non-zero and coprime.
 */
declare function chineseRemainderAlgorithm(r1: bigint, r2: bigint, m1: bigint, m2: bigint): bigint;
export { chineseRemainderAlgorithm };
