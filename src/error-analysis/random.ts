import { squares } from "squares-rng";


/**
 * Returns a random number in [0,1) using `Math.random()` or a custom RNG based
 * on the `squares-rng` library.
 * 
 * @param rngIdx optional; index for the custom RNG
 */
function random(rngIdx?: number) {
    if (rngIdx === undefined) { return Math.random(); }

    return (squares(2*rngIdx) + squares(2*rngIdx + 1)*2**-32)*2**-32;
}


export { random }
