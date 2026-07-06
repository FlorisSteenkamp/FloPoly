/**
 * Represents a root(s) bracketing interval
 *
 * * **precondition:** `tE - tS` when calculated in double precision must be
 * exact - this is actually almost guaranteed due to a theorem stating that if
 * `|a - b| <= |a|` and `|a - b| <= |b|` then `a - b` is exact
 *
 * @doc
 */
type RootInterval = {
    /** the most accurate guess of the root within the isolating interval */
    t: number;
    /** the minimum possible root value (isolating interval lower bound) */
    tS: number;
    /** the maximum possible root value (isolating interval upper bound) */
    tE: number;
    /**
     * the multiplicity of the root(s) within the isolating interval
     * * can be more by a multiple of 2,4,... in extreme cases
     */
    multiplicity: number;
};
/**
 * Simple function that creates and returns an exact root (with a bracketing
 * interval width of 0 and multiplicity 1)
 *
 * @param t
 *
 * @doc
 */
declare function createRootExact(t: number): RootInterval;
/**
 * Simple function that returns the middle of the root bracketing interval - can
 * be used to estimate the root
 *
 * @param ri a root interval
 *
 * @doc
 */
declare function mid(ri: RootInterval): number;
export type { RootInterval };
export { createRootExact, mid };
