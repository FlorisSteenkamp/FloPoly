import { eCompress, eEstimate } from 'big-float-ts';
import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { allRoots } from '../../../src/roots/naive/all-roots.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { getPolys_BezierIntersections, getPolys_BezierIntersections_PreFiltered, getPolys_BezierIntersections_MaxCoeffs } from '../../get-poly.js';
import { roots } from '../../../src/roots/descartes/roots.js';
import { γγ3 } from '../../../src/error-analysis/gamma.js';
import { getPolysUsing9PerturbedRoots } from '../../get-polys-using-9-perturbed-roots.js';
import { eHorner } from '../../../src/evaluate/expansion/e-horner.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';
import { getPolyFromRoots } from '../../get-polys-from-roots.js';
import { bernsteinToPowerBasis } from '../../../src/change-basis/double/bernstein-to-power-basis.js';
import { powerToBernsteinBasis } from '../../../src/change-basis/double/power-to-bernstein-basis.js';
import { powerToBernsteinBasis01 } from '../../../src/change-basis/double/power-to-bernstein-basis-01.js';
import { scaleFloatssToBigintss } from '../../../src/scale-to-int/scale-floatss-to-bigintss.js';
import { bSum } from '../../../src/util/bigint/b-sum.js';
import { bNumRootsInRange } from '../../../src/roots/sturm/bigint/b-num-roots-in-range.js';
import { bNumRoots } from '../../../src/roots/sturm/bigint/b-num-roots.js';
import { eFromRoots } from '../../../src/roots/from-roots/expansion/e-from-roots.js';


const { round, ceil, abs, log2, max } = Math;


/** This test is also used by the demo! */
function testIt_General(log: boolean) {
    // underflow occurs...
    // const { p, pDd, p_, pDd_, pE } = eFromRoots([
    //     [0.3], [0.3], [0.3],
    //     [0.3], [0.3], [0.3],
    //     [0.3], [0.3], [0.3], [0.3]
    // ]);
    // const rs = roots(pDd, -Infinity, Infinity, pDd_, () => pE)!;//?
    

    // return;
    // find roots within a huge range
    //const lb = -(10**10);
    //const ub = +(10**10);

    // find roots within a typical range
    const lb = 0;
    const ub = 2**0;

    // find roots on the entire projective number line
    // const lb = -Infinity;
    // const ub = Infinity;

    // find roots within some largish range
    // const lb = -(10**9);
    // const ub = +(10**9);

    /** number of polynomials to find roots of */
    // const N = 100_000;
    const N = 100;
    // const pDd = [1,-2];
    // roots(pDd, -100, 100);//?
    // const shift = 77;
    const shift = 0;

    //------------------------------------------------------------------
    // create intersection polynomials from the generated cubic beziers
    //------------------------------------------------------------------
    const timeStartCoeffs = performance.now();
    const polys = getPolys_BezierIntersections(N, shift);
    // const polys = getPolys_BezierIntersections_MaxCoeffs(N, shift, 6);
    // const polys = getPolys_BezierIntersections_PreFiltered(N, shift);
 // const polys = getPolysUsing9PerturbedRoots(N, 2000_000_000_000_000_000_000_000, 10, 0.47, shift);
    // const polys = getPolysUsing9PerturbedRoots(N, 2000_000_000_000_000_000_000_000_000, 10, 0.47, shift);
    // const polys = getPolysUsing9PerturbedRoots(N, 2000_000_000_000_000_000_000_000_000_000, 10, 0.47, shift);
    // testPoly = getPolyFromRoots([0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]);
    // const _roots_ = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9].map(r => 0.5 + r/10);
    // const _roots_ = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9].map(r => 0.25 + r/10);
    //---------------------------------------------------------------
    // const _roots_ = [0.001,0.002,0.003,0.04,0.05,30,50,100,200].map(r => 0.5 + r/4);
    //---------------------------------------------------------------
    // const _roots_ = [0.001,0.002,0.003,0.04,0.05,30,50,100,200].map(r => 0.5 + r/2);
    // const _roots_ = [0.001,0.002,0.003,0.004,0.005,3,5,10,190].map(r => 1 + r/100);
    // const _roots_ = [0.001,0.002,0.003,0.004,0.005,3,5,10,100].map(r => 1 + r/200);
    // const _roots_ = [0.001,0.002,0.003,0.004,0.005,3,5,10,100].map(r => 1 + r/1000_000_000_000);
    const _roots_ = [0.001,0.002,0.003,0.004,0.005,3,5,10,100].map(r => 0.0625/(2*4) + r/16);
    // https://www.desmos.com/calculator/529c3fuw5c
    
    const testPoly = getPolyFromRoots(_roots_);
    // polys[0] = testPoly;
    // for (let i=0; i<polys.length; i++) { polys[i] = testPoly; }
    
    // toCasStr(polys[0].pDd.map(coef => coef.map(v => v*2**-90)));//?
    // polys.map(p => p.pDd);//?
    // @ts-ignore
    // polys[0].pDd_ = polys[0].pDd_.map(c => c*2**100);

    //-----
    // testPoly = polys[0];
    // testPoly.pDd.map(coef => coef[0] + coef[1]);//?
    // toCasStr(testPoly.pDd.map(coef => coef.map(v => v*2**50)));//?
    //-----

    // const closestToRoot1 = 0.4711109820196171;  // other root -> 0.47111657388897765
    // const closestToRoot2 = 0.47111657388897765;
    // const betweenCloseRoots = 0.471115;
    // eEstimate(eHorner(polys[0].getPExact(), closestToRoot1));//?
    // eEstimate(eHorner(polys[0].getPExact(), closestToRoot2));//?
    // eEstimate(eHorner(polys[0].getPExact(), betweenCloseRoots));//?

    // eEstimate(eHorner(polys[0].getPExact(), 0.4711117211609391));//?
    // eEstimate(eHorner(polys[0].getPExact(), 0.470664132737984));//?

    // polys.map(p => p.pD);//?
    // toCasStr(polys[0].pDd.map(coef => coef.map(v => v*2**18)));//?
    let timingCoeffs = performance.now() - timeStartCoeffs;
    //------------------------------------------------------------------

    //------------------------------------------------------------------
    // find all roots of all generated polynomials using `isolateRoots`
    //------------------------------------------------------------------
    // @ts-ignore
    // globalThis.__debug__ = {};
    let numIso = 0;
    const timeStartIso = performance.now();
    for (let i=0; i<N; i++) {
        // const { pDd, errBoundUnscaledDd, getPExact } = polys[i];
        const { pDd, pDd_, getPExact } = polys[i];
        const ts = roots(pDd, lb, ub, pDd_, getPExact, false);//?
        // const rr = ts?.map(t => round((t.tS + t.tE)/2*1000_000_000)/1000_000_000).toReversed();
        // const rr = ts?.map(t => (t.tS + t.tE)/2).toReversed();
        // ts;//?
        // rr;//?
        // expect(ts?.length).toEqual(_roots_.length);
        // eEstimate(eHorner(polys[0].getPExact(), ts![0].tS));//?
        // eEstimate(eHorner(polys[0].getPExact(), ts![1].tS));//?
        // eEstimate(eHorner(polys[0].getPExact(), ts![2].tS));//?
        numIso += ts ? ts!.length : 0;
    }
    let timingIsolate = performance.now() - timeStartIso;
    // @ts-ignore
    // globalThis.__debug__;//?
    //------------------------------------------------------------------

    //---------------------------------------------------------------------
    // find all roots of all generated polynomials using allRootsCertified
    //---------------------------------------------------------------------
    let numCert = 0;
    // 1.7763568394002505e-15/Number.EPSILON;//?
    const timeStartCert = performance.now();
    for (let i=0; i<N; i++) {
        const { pDd, pDd_, getPExact } = polys[i];
        const errBound = pDd_.map((e, idx) => e*γγ3);
        const ts = allRootsCertified(pDd, lb, ub, errBound, getPExact);//?
        // ts.map(t => {
        //     const W = t.tE - t.tS;
        //     const maxW = 2*Number.EPSILON * Math.max(1, 2**Math.ceil(Math.log2(t.tS)));
        //     if (W > maxW) { throw 'a'; }
        //     return [t.tS, W, maxW, maxW/W];
        // });//?
        // const rr = ts.map(t => round((t.tS + t.tE)/2*1000_000)/1000_000);
        // rr//?
        if (ts) { numCert += ts ? ts.length : 0; }
    }
    let timingCert = performance.now() - timeStartCert;
    //---------------------------------------------------------------------


    //------------------------------------------------------------------
    // find all roots of all generated polynomials using `allRoots`
    //------------------------------------------------------------------
    // let numNaive = 0;
    // const timeStartNaive = performance.now();
    // for (let i=0; i<N; i++) {
    //     const { p } = polys[i];
    //     const ts = allRoots(p, lb, ub);
    //     numNaive += ts.length;
    // }
    // let timingNaive = performance.now() - timeStartNaive;
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

    if (!log) { return; }

    console.log(`millis (get coeffs): ${round(timingCoeffs)}`);
    // console.log(`millis (naive roots): ${round(timingNaive)}`);
    console.log(`millis (isolate roots): ${round(timingIsolate)}`);
    console.log(`millis (cert): ${round(timingCert)}`);

    // console.log(`cert/naive ${(timingCert/timingNaive).toFixed(2)}`);
    console.log(`cert/isolate ${(timingCert/timingIsolate).toFixed(2)}`);
    // console.log(`num roots (naive) ${numNaive}`);
    console.log(`num roots (cert) ${numCert}`);
    console.log(`num roots (isolate) ${numIso}`);
    // console.log(`num roots (exact) ${exactNumRoots}`);
}


export { testIt_General }
