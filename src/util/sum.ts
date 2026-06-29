
/**
 * Returns the sum of an array of doubles.
 *
 * @param vs
 */
function sum(
        vs: number[]): number {

    let sum = 0;
    for (let i=0; i<vs.length; i++) {
        sum += vs[i];
    }

    return sum;
}


export { sum }
