import { getCoeffs } from './roots/certified/getpoly/get-coeffs.js';
import { getCoeffsExact } from './roots/certified/getpoly/get-coeffs-exact.js';
import { eCompress } from 'big-float-ts';
import { getRandomCubics } from './roots/mobius/get-random-cubics.js';
import { γγ3 } from '../src/error-analysis/gamma.js';
import { Poly } from './poly.js';


/**
 * Returns realistic polynomial (the intersection polynomial of the given beziers)
 */
function getPoly(
        ps1: number[][],
        ps2: number[][]) {

    let { coeffs: pDd, errBound } = getCoeffs(ps1, ps2);
    const p = pDd.map(c => c[0] + c[1]);
    const p_ = p.map((_,idx) => Math.abs(p[idx]));

    let getPExact = () => (getCoeffsExact(ps1, ps2).map(eCompress));

    return { pDd, p, p_, pDd_: errBound, getPExact };
}


/**
 * Returns `N` realistic polynomials (the intersection polynomials of beziers)
 */
function getPolies(
        N: number,
        shift: number,
        maxBitLength = 60,
        maxCoordinate = 16384) {

    // find random cubic beziers (used later to generate realistic polynomials)
    const pss = getRandomCubics(N + 1, shift, maxBitLength, maxCoordinate);

    const polys: Poly[] = [];
    {
        for (let i=0; i<N; i++) {
            const ps1 = pss[i];
            const ps2 = pss[i+1];
            const { pDd, p, p_, pDd_, getPExact } = getPoly(ps1, ps2);
            // const pE = getPExact();

            polys.push({ /*pE,*/ pDd, pDd_, p, p_, getPExact });
        }
    }

    return polys;
}


export { getPolies }
