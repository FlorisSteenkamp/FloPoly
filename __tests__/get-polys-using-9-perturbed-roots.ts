import { eCompress, eToDd } from 'big-float-ts';
import { eMultiply } from '../src/basic/expansion/e-multiply.js';
import { randomIntInRange } from '../src/error-analysis/random-int-in-range.js';
import { ddPerturb } from '../src/error-analysis/dd-perturb.js';
import { γγ3 } from '../src/error-analysis/gamma.js';
import { eFromRoots } from '../src/roots/from-roots/expansion/e-from-roots.js';
import { ddToE } from './dd-to-e.js';
import { Poly } from './poly.js';

const { abs } = Math;


/**
 * Returns N polynomials of degree 9 with close roots at `rootAt` but perturbed
 * with a predictable random error in the coefficients.
 * 
 * * the number of roots is 3 for some reason as opposed to 9
 * 
 * @param N 
 * @param MAX_PERTURB_A Stewart error counter perturbation in order to split roots
 * @param MAX_PERTURB_B Stewart error counter perturbation to simulate error in coefficients
 * @param rootAt
 * @param shift the RNG seed shift
 */
function getPolysUsing9PerturbedRoots(
        N: number,
        MAX_PERTURB_A: number,
        MAX_PERTURB_B: number,
        rootAt: number,
        shift: number): Poly[] {

    function getC(c: number[], i: number, idx: number, pIdx: number) {
        const rngIdx1 = 1000*pIdx + 100*i + 10*idx + 0;
        const rngIdx2 = 1000*pIdx + 100*i + 10*idx + 1;

        const E = randomIntInRange(0, MAX_PERTURB_A, rngIdx1);
        return ddToE(ddPerturb(c, E, rngIdx2));
    }


    const _ps = [];
    for (let i=0; i<N; i++) {
        const _p1 = eFromRoots([[0,rootAt], [0,rootAt], [0,rootAt]]).pDd;
        const _p2 = eFromRoots([[0,rootAt], [0,rootAt], [0,rootAt]]).pDd;
        const _p3 = eFromRoots([[0,rootAt], [0,rootAt], [0,rootAt]]).pDd;

        const p1 = _p1.map((c,idx) => getC(c, (i + shift), idx, 0));
        const p2 = _p2.map((c,idx) => getC(c, (i + shift), idx, 1));
        const p3 = _p3.map((c,idx) => getC(c, (i + shift), idx, 2));
        
        const _p = eMultiply(eMultiply(p1,p2),p3);
        _ps.push(_p.map(eCompress));
    }
    // _ps;//?

    const polys: Poly[] = [];

    for (let i=0; i<N; i++) {
        // Before error perturbation
        const _p = _ps[i];
        const pDd = _p.map(eToDd);
        // const pD = pDd.map(c => c[c.length - 1]);

        // Perturb
        const EsDd = _p.map((_, idx) => randomIntInRange(0, MAX_PERTURB_B, 2000 + 100*(i + shift) + 10*idx + 0));
        const coeffs = pDd.map((c,idx) => ddPerturb(c, EsDd[idx], 3000 + 100*(i + shift) + 10*idx + 0));
        const p = coeffs.map(c => c[c.length - 1]);
        const p_ = coeffs.map(c => abs(c[c.length - 1]));
        // const errBound = coeffs.map((c,idx) => {
        //     // return ceil(abs(errBound[idx]/γγ3/(c[0] + c[1])));
        //     // return γγ3*EsDd[idx]*abs(c[0] + c[1])
        //     return γγ3*EsDd[idx]*abs(c[0] + c[1])
        // });
        const errBoundUnscaledDd = coeffs.map((c,idx) => {
            // return ceil(abs(errBound[idx]/γγ3/(c[0] + c[1])));
            // return γγ3*EsDd[idx]*abs(c[0] + c[1])
            return EsDd[idx]*abs(c[0] + c[1])
        });

        const getPExact = () => _p;

        // polys.push({ pDd: coeffs, pD, errBound, errBoundUnscaledDd, EsDd, getPExact });
        polys.push({ /*pE: _p,*/ pDd: coeffs, p, p_, pDd_: errBoundUnscaledDd, /*EsDd,*/ getPExact });
    }

    return polys;
}


export { getPolysUsing9PerturbedRoots }
