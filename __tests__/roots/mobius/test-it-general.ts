import { eCompress, eEstimate } from 'big-float-ts';
import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { allRoots } from '../../../src/roots/naive/all-roots.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { getPolies } from '../../get-poly.js';
import { roots } from '../../../src/roots/descartes/roots.js';
import { γγ3 } from '../../../src/error-analysis/gamma.js';
import { getPolysUsing9PerturbedRoots } from '../../get-polys-using-9-perturbed-roots.js';
import { eHorner } from '../../../src/evaluate/expansion/e-horner.js';
import { fromRoots } from '../../../src/roots/from-roots/double/from-roots.js';
import { getPolyFromRoots } from '../../get-polys-from-roots.js';
import { bernsteinToPowerBasis } from '../../../src/change-basis/double/bernstein-to-power-basis.js';
import { powerToBernsteinBasis } from '../../../src/change-basis/double/power-to-bernstein-basis.js';
import { powerToBernsteinBasis01 } from '../../../src/change-basis/double/power-to-bernstein-basis-01.js';


const { round, ceil, abs } = Math;


/** This test is also used by the demo! */
function testIt_General(log: boolean) {
    // return;
    // find roots within a huge range
    //const lb = -(10**10);
    //const ub = +(10**10);

    // find roots within a typical range
    const lb = 0;
    const ub = 1;

    // find roots on the entire projective number line
    // const lb = -Infinity;
    // const ub = Infinity;

    // find roots within some largish range
    // const lb = -(10**9);
    // const ub = +(10**9);

    /** number of polynomials to find roots of */
    // const N = 100_000;
    const N = 1;
    // const shift = 77;
    const shift = 77;

    //------------------------------------------------------------------
    // create intersection polynomials from the generated cubic beziers
    //------------------------------------------------------------------
    const timeStartCoeffs = performance.now();
    const polys = getPolies(N, shift);
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
    const _roots_ = [0.001,0.002,0.003,0.04,0.05,30,50,100,200].map(r => 1 + r/16);
    // https://www.desmos.com/calculator/529c3fuw5c
    const testPoly = getPolyFromRoots(_roots_);
    polys[0] = testPoly;
    
    toCasStr(testPoly.pDd.map(coef => coef.map(v => v*2**28)));//?
    // @ts-ignore

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
    globalThis.__debug__ = {};
    let numIso = 0;
    const timeStartIso = performance.now();
    for (let i=0; i<N; i++) {
        // const { pDd, errBoundUnscaledDd, getPExact } = polys[i];
        const { pDd, pDd_, getPExact } = polys[i];
        const ts = roots(pDd, lb, ub, pDd_, getPExact);
        ts?.map(t => round(t.tS*1000_000)/1000_000);//?
        // eEstimate(eHorner(polys[0].getPExact(), ts![0].tS));//?
        // eEstimate(eHorner(polys[0].getPExact(), ts![1].tS));//?
        // eEstimate(eHorner(polys[0].getPExact(), ts![2].tS));//?
        numIso += ts!.length;
    }
    let timingIsolate = performance.now() - timeStartIso;
    // @ts-ignore
    globalThis.__debug__;//?
    //------------------------------------------------------------------


    //------------------------------------------------------------------
    // find all roots of all generated polynomials using `isolateRoots`
    //------------------------------------------------------------------
    let numNaive = 0;
    const timeStartNaive = performance.now();
    for (let i=0; i<N; i++) {
        const { p } = polys[i];
        const ts = allRoots(p, lb, ub);
        numNaive += ts.length;
    }
    let timingNaive = performance.now() - timeStartNaive;
    //------------------------------------------------------------------


    //---------------------------------------------------------------------
    // find all roots of all generated polynomials using allRootsCertified
    //---------------------------------------------------------------------
    let numCert = 0;
    const timeStartCert = performance.now();
    for (let i=0; i<N; i++) {
        const { pDd, pDd_, getPExact } = polys[i];
        const errBound = pDd_.map((e, idx) => e*γγ3);
        const ts = allRootsCertified(pDd, lb, ub, errBound, getPExact);
        // ts.map(t => t.tS);//?
        if (ts) { numCert += ts.length; }
    }
    let timingCert = performance.now() - timeStartCert;
    //---------------------------------------------------------------------

    //---------------------------------------------
    // Get the **exact** number of roots
    // * can be slow so comment for long test runs
    //---------------------------------------------
    // let exactNumRoots = 0;
    // for (let i=0; i<N; i++) {
    //     const { pDd, pD, errBound, getPExact } = polys[i];
    //     const coeffsExact = getPExact();
    //     const bCoeffs = scaleFloatssToBigintss(coeffsExact);
    //     // bCoeffs;
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
    console.log(`millis (naive roots): ${round(timingNaive)}`);
    console.log(`millis (isolate roots): ${round(timingIsolate)}`);
    console.log(`millis (cert): ${round(timingCert)}`);

    console.log(`cert/naive ${(timingCert/timingNaive).toFixed(2)}`);
    console.log(`cert/isolate ${(timingCert/timingIsolate).toFixed(2)}`);
    console.log(`num roots (naive) ${numNaive}`);
    console.log(`num roots (cert) ${numCert}`);
    console.log(`num roots (isolate) ${numIso}`);
    // console.log(`num roots (exact) ${exactNumRoots}`);
}


export { testIt_General }


function splitLeft3(
        ps: number[], 
        t: number) {

    const y00 = ps[0]; 
    const y10 = ps[1];
    const y20 = ps[2]; 
    const y30 = ps[3];
    const y01 = y00 - t*(y00 - y10);
    const y11 = y10 - t*(y10 - y20);
    const y21 = y20 - t*(y20 - y30);
    const y02 = y01 - t*(y01 - y11);
    const y12 = y11 - t*(y11 - y21);
    const y03 = y02 - t*(y02 - y12);

    return [y00, y01, y02, y03];
}


function splitLeft6(
        ps: number[],
        t: number) {

    const y00 = ps[0];
    const y10 = ps[1];
    const y20 = ps[2];
    const y30 = ps[3];
    const y40 = ps[4];
    const y50 = ps[5];
    const y60 = ps[6];

    const y01 = y00 - t*(y00 - y10);
    const y11 = y10 - t*(y10 - y20);
    const y21 = y20 - t*(y20 - y30);
    const y31 = y30 - t*(y30 - y40);
    const y41 = y40 - t*(y40 - y50);
    const y51 = y50 - t*(y50 - y60);

    const y02 = y01 - t*(y01 - y11);
    const y12 = y11 - t*(y11 - y21);
    const y22 = y21 - t*(y21 - y31);
    const y32 = y31 - t*(y31 - y41);
    const y42 = y41 - t*(y41 - y51);

    const y03 = y02 - t*(y02 - y12);
    const y13 = y12 - t*(y12 - y22);
    const y23 = y22 - t*(y22 - y32);
    const y33 = y32 - t*(y32 - y42);

    const y04 = y03 - t*(y03 - y13);
    const y14 = y13 - t*(y13 - y23);
    const y24 = y23 - t*(y23 - y33);

    const y05 = y04 - t*(y04 - y14);
    const y15 = y14 - t*(y14 - y24);

    const y06 = y05 - t*(y05 - y15);

    return [y00, y01, y02, y03, y04, y05, y06];
}


function splitLeftN(
        ps: number[],
        t: number) {

    const n = ps.length - 1;
    if (n < 0) {
        return [];
    }

    const rows: number[][] = [ps.slice()];
    for (let level=1; level<=n; level++) {
        const prev = rows[level - 1];
        const row = new Array<number>(n - level + 1);
        for (let i=0; i<=n - level; i++) {
            const a = prev[i];
            row[i] = a - t*(a - prev[i + 1]);
        }
        rows.push(row);
    }

    const left = new Array<number>(n + 1);
    for (let level=0; level<=n; level++) {
        left[level] = rows[level][0];
    }

    return left;
}


function splitRight3(
        ps: number[], 
        t: number) {

    const y00 = ps[0]; 
    const y10 = ps[1];
    const y20 = ps[2]; 
    const y30 = ps[3];
    const y01 = y00 - t*(y00 - y10);
    const y11 = y10 - t*(y10 - y20);
    const y21 = y20 - t*(y20 - y30);
    const y02 = y01 - t*(y01 - y11);
    const y12 = y11 - t*(y11 - y21);
    const y03 = y02 - t*(y02 - y12);

    return [y03, y12, y21, y30];
}
