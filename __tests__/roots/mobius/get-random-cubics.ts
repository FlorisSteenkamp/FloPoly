import { squares, squares4 } from 'squares-rng';
import { reduceSignificand } from "big-float-ts";

const { ceil, log2, abs, floor } = Math;


/**
 * 
 * @param N the number of polynomials to generate
 * @param rngShift a random seed to shift the range of generated points
 * @param maxBitLength the maximum bitlength of the input bezier points
 * @param maxCoordinate the maximum coordinate of the input bezier curves - can really be almost anything
 */
function getRandomCubics(
        N: number,
        rngShift = 0,
        maxBitLength = 60,
        maxCoordinate = 16384): number[][][] {

    let pss: number[][][] = [];
    for (let i=0; i<N; i++) {
        pss.push(getRandomCubic(i + rngShift, maxBitLength, maxCoordinate));
    }

    return pss;
}


/**
 * 
 * @param N the number of polynomials to generate
 * @param shift a random seed to shift the range of generated points
 * @param maxBitLength the maximum bitlength of the input bezier points
 * @param maxCoordinate the maximum coordinate of the input bezier curves - can really be almost anything
 */
function getRandomCubic(
        rngIdx: number,
        maxBitLength = 60,
        maxCoordinate = 16384): number[][] {

    // the maximum power of 2 exponent of the maximum coordinate
    const expMax = ceil(log2(maxCoordinate));

    // a function to generate a raondom point on a grid with given max coordinate
    // and max bitlength - expMax is really superfluous / redundant
    const r = randOnGrid(maxCoordinate, expMax, maxBitLength);

    return [
        [r(8*rngIdx + 0),r(8*(rngIdx) + 1)],
        [r(8*rngIdx + 2),r(8*(rngIdx) + 3)],
        [r(8*rngIdx + 4),r(8*(rngIdx) + 5)],
        [r(8*rngIdx + 6),r(8*(rngIdx) + 7)]
    ];
}


/** random function to shift range so it is centered at zero */
function rand(max: number, m: number) { 
    // return 2*max * (random() - 0.5); 
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

    let expA = floor(log2(abs(a)));
    let expDif = expMax - expA;
    let newSig = significantFigures - expDif + 1;

    if (newSig <= 0) { return 0; }

    let res = reduceSignificand(a, newSig);

    return res;
}


export { getRandomCubic, getRandomCubics }
