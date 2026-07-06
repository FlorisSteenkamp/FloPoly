/**
 * Returns a random number in [0,1) using `Math.random()` or a custom RNG based
 * on the `squares-rng` library.
 *
 * @param rngIdx optional; index for the custom RNG
 */
declare function random(rngIdx?: number): number;
export { random };
