import { getCoeffs } from './roots/certified/getpoly/get-coeffs.js';
// import { getCoeffs } from './roots/certified/getpoly/get-coeffs-copy.js';
import { getCoeffsExact } from './roots/certified/getpoly/get-coeffs-exact.js';
import { eCompress } from 'big-float-ts';
import { getRandomCubic, getRandomCubics } from './roots/mobius/get-random-cubics.js';
import { Poly } from './poly.js';
import { getControlPointBox } from './helpers/bezier/get-control-point-box.js';
import { areBoxesIntersecting } from './helpers/bezier/are-boxes-intersecting.js';


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
function getPolys_BezierIntersections(
        N: number,
        shift: number,
        maxBitLength = 60,
        maxCoordinate = 16384) {

    // find random cubic beziers (used later to generate realistic polynomials)
    const polys: Poly[] = [];

    for (let i=0; i<N; i++) {
        const pss1 = getRandomCubic(2*(i+shift) + 0, maxBitLength, maxCoordinate);
        const pss2 = getRandomCubic(2*(i+shift) + 1, maxBitLength, maxCoordinate);
        const { pDd, p, p_, pDd_, getPExact } = getPoly(pss1, pss2);

        polys.push({ pDd, pDd_, p, p_, getPExact });
    }

    return polys;
}


/**
 * * These are considered the most practically common polynomials of degree 9
 *   in geometric applications that we can dream up.
 * 
 * @param N 
 * @param shift 
 * @param maxBitLength 
 * @param maxCoordinate 
 */
function getPolys_BezierIntersections_PreFiltered(
        N: number,
        shift: number,
        maxBitLength = 60,
        maxCoordinate = 16384) {

    // find random cubic beziers (used later to generate realistic polynomials)
    const polys: Poly[] = [];

    let count = 0;
    let i = 0;
    while (count < N) {
        i++;
        const pss1 = getRandomCubic(2*(i+shift) + 0, maxBitLength, maxCoordinate);
        const pss2 = getRandomCubic(2*(i+shift) + 1, maxBitLength, maxCoordinate);

        const box1 = getControlPointBox(pss1);
        const box2 = getControlPointBox(pss2);
        const intersecting = areBoxesIntersecting(true, box1, box2);
        if (!intersecting) {
            continue;  // prefilter
        }

        count++;

        const { pDd, p, p_, pDd_, getPExact } = getPoly(pss1, pss2);

        polys.push({ pDd, pDd_, p, p_, getPExact });
    }

    return polys;
}


function getPolys_BezierIntersections_MaxCoeffs(
        N: number,
        shift: number,
        maxCoeffs: number,
        maxBitLength = 60,
        maxCoordinate = 16384) {

    return getPolys_BezierIntersections(N,shift,maxBitLength,maxCoordinate).map(pp => {
        const { p, pDd, p_, pDd_, getPExact } = pp;

        const $p = p.slice(0, maxCoeffs);
        const $pDd = pDd.slice(0, maxCoeffs);
        const $p_ = p_.slice(0, maxCoeffs);
        const $pDd_ = pDd_.slice(0, maxCoeffs);
        const pExact = getPExact().slice(0, maxCoeffs);

        const $getPExact = () => pExact;

        return { p: $p, pDd: $pDd, p_: $p_, pDd_: $pDd_, getPExact: $getPExact };
    });
}


export {
    getPolys_BezierIntersections,
    getPolys_BezierIntersections_PreFiltered,
    getPolys_BezierIntersections_MaxCoeffs
}
