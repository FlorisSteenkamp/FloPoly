import { eCompress } from 'big-float-ts';
import { getCoeffsD } from './get-coeffs-d.js';
import { getCoeffsExact } from '../getpoly/get-coeffs-exact.js';
import { getRandomCubics } from '../../mobius/get-random-cubics.js';
import { getCoeffs } from '../getpoly/get-coeffs.js';


/**
 * Returns realistic polynomial (the intersection polynomial of the given beziers)
 */
function getPoly(
        ps1: number[][],
        ps2: number[][]) {

    const { coeffs: pD, errBound  } = getCoeffsD(ps1, ps2);
    const { coeffs: pDd, errBound: errBoundDd } = getCoeffs(ps1, ps2);

    const getPExact = () => getCoeffsExact(ps1, ps2).map(eCompress);

    return { pD, pDd, errBound, errBoundDd, getPExact };
}


/**
 * Returns `N` realistic polynomials (the intersection polynomials of beziers)
 */
function getPoliesD(
        N: number,
        shift: number,
        maxBitLength = 60,
        maxCoordinate = 16384) {

    // find random cubic beziers (used later to generate realistic polynomials)
    const pss = getRandomCubics(N + 1, shift, maxBitLength, maxCoordinate);

    const polys: { pD: number[]; pDd: number[][]; errBound: number[]; errBoundDd: number[]; getPExact: () => number[][]; }[] = [];
    {
        for (let i=0; i<N; i++) {
            const ps1 = pss[i];
            const ps2 = pss[i+1];
            const { pDd, pD, errBound, errBoundDd, getPExact } = getPoly(ps1, ps2);
            polys.push({ pD, pDd, errBound, errBoundDd, getPExact });
        }
    }

    return polys;
}


export { getPoliesD }
