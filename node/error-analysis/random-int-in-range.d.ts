/**
 * Returns a random integer in the range `[minV, maxV]`
 *
 * * range includes its endpoints
 *
 * @param minV
 * @param maxV
 * @param rngIdx
 *
 * * **not optimized**; **use in tests only!**
 */
declare function randomIntInRange(minV: number, maxV: number, rngIdx?: number | undefined): number;
export { randomIntInRange };
