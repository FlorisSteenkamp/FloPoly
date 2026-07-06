import { describe, expect, it } from '@jest/globals';
import { eCompress, eEstimate } from 'big-float-ts';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { getPolys_BezierIntersections } from '../../get-poly.js';
import { roots } from '../../../src/roots/descartes/roots.js';
import { Poly } from '../../poly.js';
import { ddMultiply } from '../../../src/basic/double-double/dd-multiply.js';
import { eMultiply } from '../../../src/basic/expansion/e-multiply.js';

const { round, ceil, abs, log2, max } = Math;


function testIt_HighDeg() {
    // find roots within a typical range
    const lb = 0;
    const ub = 2**0;

    // find roots on the entire projective number line
    // const lb = -Infinity;
    // const ub = Infinity;

    /** number of polynomials to find roots of */
    // const N = 100_000;
    const N = 1;
    // const M = 20;  // (10*M - 1) degree polynomials
    const M = 2;
    const shift = 0;

    //------------------------------------------------------------------
    // create intersection polynomials from the generated cubic beziers
    //------------------------------------------------------------------
    const polys: Partial<Poly>[] = [];
    const _polys = getPolys_BezierIntersections(N*M, shift).map(p => {
        const pDd = p.pDd;
        const pE = p.getPExact();

        const maxAbs = max(...pDd.map(c => c[1]));
        const s = 2**-(ceil(log2(abs(maxAbs))));//?
        return {
            pDd: pDd.map(dd => dd.map(v => v*s*2**2)),
            pE: pE.map(coef => coef.map(v => v*s*2**2)),
        }
    });
    _polys[0];//?
    for (let i=0; i<N; i++) {
        let polyDd: number[][] = [[0,1]];
        for (let j=0; j<M; j++) {
            const { pDd/*, pDd_*/ } = _polys[i*M + j];
            polyDd = ddMultiply(polyDd,pDd);
        }
        let polyE: number[][] = [[1]];
        for (let j=0; j<M; j++) {
            const { pE } = _polys[i*M + j];
            polyE = eMultiply(polyE, pE);
        }
        polyE;//?
        const pDd_ = polyDd.map(dd => 0);
        polys.push({ pDd: polyDd, pDd_, getPExact: () => polyE });
    }
    polys[0].getPExact!();//?
    // throw 'a';


    //------------------------------------------------------------------
    // find all roots of all generated polynomials using `isolateRoots`
    //------------------------------------------------------------------
    let numIso = 0;
    const timeStartIso = performance.now();
    for (let i=0; i<N; i++) {
        const { pDd, pDd_, getPExact } = polys[i];
        const rs = roots(pDd!, lb, ub, pDd_, getPExact, false);
        numIso += rs ? rs!.length : 0;
        pDd?.length;//?
        rs?.length;//?
        rs;
    }
    let timingIsolate = performance.now() - timeStartIso;
    //------------------------------------------------------------------

    //---------------------------------------------
    // Get the **exact** number of roots
    // * can be slow so comment for long test runs
    //---------------------------------------------
    // let exactNumRoots = 0;
    // for (let i=0; i<N; i++) {
    //     const { getPExact } = polys[i];
    //     const coeffsExact = getPExact();
    //     const bCoeffs = scaleFloatssToBigintss(coeffsExact);
    //     const bCoeffs_ = bCoeffs.map(bSum);

    //     //-----------------------------------------------------------
    //     // const coeffsExact2 = coeffsExact.map(eCompress);
    //     // const bCoeffs2 = scaleFloatssToBigintss(coeffsExact2);
    //     // const bCoeffs2_ = bCoeffs2.map(bSum);//?
    //     //-----------------------------------------------------------
        

    //     const numRoots = Number.isFinite(lb) && Number.isFinite(ub)
    //         ? bNumRootsInRange(bCoeffs_, BigInt(lb), BigInt(ub))
    //         : bNumRoots(bCoeffs_);

    //     exactNumRoots += numRoots;
    // }

    console.log(`degrees: ${round(polys[0].pDd!.length)}`);
    console.log(`millis (roots): ${round(timingIsolate)}`);
    console.log(`num roots (isolate) ${numIso}`);
    // console.log(`num roots (exact) ${exactNumRoots}`);
}


export { testIt_HighDeg }
