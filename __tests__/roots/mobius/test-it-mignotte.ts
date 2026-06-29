import { expect } from '@jest/globals';
import { eCompress, eToDd } from 'big-float-ts';
import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { allRoots } from '../../../src/roots/naive/all-roots.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { eNumRootsInRange } from '../../../src/roots/sturm/expansion/e-num-roots-in-range.js';
import { eNumRoots } from '../../../src/roots/sturm/expansion/e-num-roots.js';
import { bNumRoots } from '../../../src/roots/sturm/bigint/b-num-roots.js';
import { scaleFloatssToBigintss } from '../../../src/scale-to-int/scale-floatss-to-bigintss.js';
import { bSum } from '../../../src/util/bigint/b-sum.js';
import { roots } from '../../../src/roots/descartes/roots.js';
import { eMultiply } from '../../../src/basic/expansion/e-multiply.js';
import { randomIntInRange } from '../../../src/error-analysis/random-int-in-range.js';
import { ddGenerateMignottePolynomial } from '../../../src/generate/dd-generate-mignotte-poly.js';
import { ddPerturb } from '../../../src/error-analysis/dd-perturb.js';
import { sum } from '../../../src/util/sum.js';
import { γγ3 } from '../../../src/error-analysis/gamma.js';
import { getPolysUsing9PerturbedRoots } from '../../get-polys-using-9-perturbed-roots.js';
import { ddToE } from '../../dd-to-e.js';


const { round, abs, ceil } = Math;


/** This test is also used by the demo! */
function testIt_Mignotte(log: boolean) {
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
    const N = 10_000;
    const shift = 0;  // RNG index shift
    const MAX_PERTURB_A = 10;
    const MAX_PERTURB_B = 50;

    //------------------------------------
    // create random Mignotte polynomials
    //------------------------------------
    // const polys = getPolysUsing3Mignottes(N, MAX_PERTURB_A, MAX_PERTURB_B);
    const polys = getPolysUsing9PerturbedRoots(N, 100_000, MAX_PERTURB_B, 0.44, shift);
    // toCasStr(polys[0].coeffsD);//?
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


    //------------------------------------------------------------------
    // find all roots of all generated polynomials using `isolateRoots`
    //------------------------------------------------------------------
    let numIso = 0;
    const timeStartIso = performance.now();
    for (let i=0; i<N; i++) {
        const { pDd, pDd_, getPExact } = polys[i];
        const ts = roots(pDd, lb, ub, pDd_, getPExact, false);
        if (ts) {
            numIso += sum(ts.map(t => t.multiplicity)) || 0;
        }
    }
    let timingIsolate = performance.now() - timeStartIso;
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
        if (ts) {
            numCert += sum(ts.map(t => t.multiplicity)) || 0;
        }
    }
    let timingCert = performance.now() - timeStartCert;
    //---------------------------------------------------------------------

    //---------------------------------------------
    // Get the **exact** number of roots
    // * can be slow so comment for long test runs
    //---------------------------------------------
    let exactNumRoots = 0;
    for (let i=0; i<N; i++) {
        const coeffsExact = polys[i].getPExact();

        const numRoots = Number.isFinite(lb) && Number.isFinite(ub)
            ? eNumRootsInRange(coeffsExact, [lb], [ub])
            : eNumRoots(coeffsExact);

        exactNumRoots += numRoots;
    }

    if (!log) { return; }

    // console.log(`millis (get coeffs): ${round(timingCoeffs)}`);
    console.log(`millis (naive roots): ${round(timingNaive)}`);
    console.log(`millis (isolate roots): ${round(timingIsolate)}`);
    console.log(`millis (cert): ${round(timingCert)}`);

    console.log(`cert/naive ${(timingCert/timingNaive).toFixed(2)}`);
    console.log(`cert/isolate ${(timingCert/timingIsolate).toFixed(2)}`);
    console.log(`num roots (naive) ${numNaive}`);
    console.log(`num roots (cert) ${numCert}`);
    console.log(`num roots (isolate) ${numIso}`);
    console.log(`num roots (exact) ${exactNumRoots}`);
}


// getPolysUsing9PerturbedRoots(1,10,10);//?


function getPolysUsing3Mignottes(
        N: number,
        MAX_PERTURB_A: number,
        MAX_PERTURB_B: number) {

    function getC(c: number[], i: number, idx: number, pIdx: number) {
        const rngIdx1 = 1000*pIdx + 100*i + 10*idx + 0;
        const rngIdx2 = 1000*pIdx + 100*i + 10*idx + 1;

        const E = randomIntInRange(0, MAX_PERTURB_A, rngIdx1);
        return ddToE(ddPerturb(c, E, rngIdx2));
    }


    const _ps = [];
    for (let i=0; i<N; i++) {
        const _p1 = ddGenerateMignottePolynomial(3,15);
        const _p2 = ddGenerateMignottePolynomial(3,15);
        const _p3 = ddGenerateMignottePolynomial(3,15);

        const p1 = _p1.map((c,idx) => getC(c, i, idx, 0));
        const p2 = _p2.map((c,idx) => getC(c, i, idx, 1));
        const p3 = _p3.map((c,idx) => getC(c, i, idx, 2));
        
        const _p = eMultiply(eMultiply(p1,p2),p3);
        _ps.push(_p.map(eCompress));
    }
    // _ps;//?

    const polys: {
        coeffs: number[][];
        coeffsD: number[];
        EsDd: number[];
        errBound: number[];
        getPExact: () => number[][];
    }[] = [];

    for (let i=0; i<N; i++) {
        // Before error perturbation
        const _p = _ps[i];
        const pDd = _p.map(eToDd);

        // Perturb
        const EsDd = _p.map((_, idx) => randomIntInRange(0, MAX_PERTURB_B, 2000 + 100*i + 10*idx + 0));
        const coeffs = pDd.map((c,idx) => ddPerturb(c, EsDd[idx], 3000 + 100*i + 10*idx + 0));
        const coeffsD = coeffs.map(c => c[c.length - 1]);
        const errBound = coeffs.map((c,idx) => {
            return γγ3*EsDd[idx]*abs(c[0] + c[1])
        });

        const getPExact = () => _p;

        polys.push({ coeffs, coeffsD, errBound, EsDd, getPExact });
    }

    return polys;
}


export { testIt_Mignotte }


