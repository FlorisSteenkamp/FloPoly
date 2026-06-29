import { squares, squares4 } from 'squares-rng';
import { reduceSignificand } from "big-float-ts";


/**
 * 
 * @param N the number of polynomials to generate
 * @param shift a random seed to shift the range of generated points
 * @param maxBitLength the maximum bitlength of the input bezier points
 * @param maxCoordinate the maximum coordinate of the input bezier curves - can really be almost anything
 */
function getRandomCubics(
        N: number,
        shift = 0,
        maxBitLength = 60,
        maxCoordinate = 16384): number[][][] {

    // the maximum power of 2 exponent of the maximum coordinate
    const expMax = Math.ceil(Math.log2(maxCoordinate));

    // a function to generate a raondom point on a grid with given max coordinate
    // and max bitlength - expMax is really superfluous / redundant
    const r = randOnGrid(maxCoordinate, expMax, maxBitLength);

    let pss: number[][][] = [];
    for (let i=0; i<N; i++) {
        pss.push([
            [r(8*i + 0 + 8*shift),r(8*i + 1 + 8*shift)],
            [r(8*i + 2 + 8*shift),r(8*i + 3 + 8*shift)],
            [r(8*i + 4 + 8*shift),r(8*i + 5 + 8*shift)],
            [r(8*i + 6 + 8*shift),r(8*i + 7 + 8*shift)]
        ]);
    }

    return pss;
}


/** random function to shift range so it is centered at zero */
function rand(max: number, m: number) { 
    // return 2*max * (Math.random() - 0.5); 
    return 2*max * (squares4(m)*(2**-32) - 0.5);
}


/**
 * a curried function to generate a raondom point on a grid with given max coordinate
 * and max bitlength - expMax is really superfluous / redundant
 */
function randOnGrid(
        max: number,
        expMax: number,
        significantFigures: number) { 

    return function(m: number) {
        return toGrid(rand(max, m), expMax, significantFigures);
    };
}


/** a function to send a given number to a fixed grid */
function toGrid(
        a: number, 
        expMax: number,
        significantFigures: number): number {

    let expA = Math.floor(Math.log2(Math.abs(a)));
    let expDif = expMax - expA;
    let newSig = significantFigures - expDif + 1;

    if (newSig <= 0) { return 0; }

    let res = reduceSignificand(a, newSig);

    return res;
}


export { getRandomCubics }
