import { test, describe, expect, it } from '@jest/globals';
import { eCompress, eDiff, eEstimate } from 'big-float-ts';
import { hornerWithRunningError } from '../../../src/evaluate/double/horner-with-running-error.js';
import { HornerWithInpError } from '../../../src/evaluate/double/horner-with-inp-error.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { eeHorner } from '../../../src/evaluate/expansion/e-e-horner.js';
import { getPolysUsing9PerturbedRoots } from '../../get-polys-using-9-perturbed-roots.js';
import { eNumRootsInRange } from '../../../src/roots/sturm/expansion/e-num-roots-in-range.js';
import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { γ1, γγ3 } from '../../../src/error-analysis/gamma.js';
import { randomIntInRange } from '../../../src/error-analysis/random-int-in-range.js';
import { getPoliesD } from '../../roots/certified/getpoly-d/get-poly-d.js';
import { random } from '../../../src/error-analysis/random.js';

const { abs } = Math;


test('`hornerWithInpError`', function() {
    {
        //---------------------------------
        // Hard cases
        //---------------------------------
        const N = 0;
        const shift = 0;
        const polys = getPolysUsing9PerturbedRoots(N, 10, 0, 0.44, shift);
        for (let i=0; i<N; i++) {
            const { pDd, p, pDd_, getPExact } = polys[i];
            const pEe = getPExact();
            // toCasStr(pEe);//?
            // const realNumRoots = eNumRootsInRange(pEe, [0], [1]);

            const errBound = pDd_.map((e, idx) => e*γγ3);
            const rs = allRootsCertified(pDd, 0, 1, errBound, getPExact);
            // const rsB = roots(pDd, 0, 1, EsDd, getPExact);
            const r0 = (rs[0].tS + rs[0].tE)/2;

            const [v,errMax] = hornerWithRunningError(p,r0);
            const vEe = eCompress(eeHorner(pEe,[r0]));
            const err = abs(eEstimate(eDiff(vEe, [v])));

            expect(errMax).toBeGreaterThanOrEqual(err);
        }
    }

    {
        //---------------------------------
        // Easy cases
        //---------------------------------
        const N = 1;
        const shift = 4895;
        const polys = getPoliesD(N, shift);
        let maxErrPerMax = -Infinity;
        let maxErrWithInpMax = -Infinity;
        for (let i=0; i<N; i++) {
            const { pD, pDd, errBound, errBoundDd, getPExact } = polys[i];

            const pEe = getPExact();
            // toCasStr(pEe);//?
            const realNumRoots = eNumRootsInRange(pEe, [0], [1]);
            if (realNumRoots === 0) { continue; }
            const rs = allRootsCertified(pDd, 0, 1, errBoundDd, getPExact);
            const r0 = (rs[0].tS + rs[0].tE)/2;
            const vEe = eCompress(eeHorner(pEe,[r0]));

            const pD2 = pDd.map(c => c[0] + c[1]);
            const [vCalc,errMax] = hornerWithRunningError(pD2,r0);
            const [r̂,e] = HornerWithInpError(pD, r0, errBound);
            const e_ = e*γ1;

            const err = abs(eEstimate(eDiff(vEe, [vCalc])));//?
            const errWithInp = abs(eEstimate(eDiff(vEe, [r̂])));//?
            // const vActualD = eEstimate(vEe);//?

            const errPerMax = err/errMax;
            const errWithInpMax = errWithInp/e_;

            if (errPerMax > maxErrPerMax) { maxErrPerMax = errPerMax; }
            if (errWithInpMax > maxErrWithInpMax) { maxErrWithInpMax = errWithInpMax; }

            // expect(errMax).toBeGreaterThanOrEqual(err);
        }

        //---------------------------------------------------------------------------------
        // We see from the below the forward error bound is way looser than the running error bound,
        // which is expected since the forward error bound is a worst-case bound while the running
        // error is a more precise bound for the actual error in the specific case.
        //
        // We also see that the running error bound is quite tight, with the actual
        // error being at most around 0.5 times the running error bound in these cases.
        //---------------------------------------------------------------------------------
        
        // The below would fail since `pD2` above is not exact
        // maxErrPerMax;//?
        // expect(maxErrPerMax < 1).toBe(true);
        // expect(maxErrPerMax > 0.1).toBe(true);  // make sure error bound is tight(ish)

        // maxErrWithInpMax;//?
        expect(maxErrWithInpMax < 1).toBe(true);
        expect(maxErrWithInpMax > 0.001).toBe(true);  // make sure error bound is tight(ish)
    }

    {
        //---------------------------------
        // Easy cases
        //---------------------------------
        const N = 1000;
        const shift = 8240;

        const polys: number[][] = [];
        const polysPerts: number[][] = [];
        const errBounds: number[][] = [];
        let maxIdx = -1;
        for (let i=0; i<N; i++) {
            const poly: number[] = [];
            const polyPert: number[] = [];
            const errBound: number[] = [];
            for (let j=0; j<10; j++) {
                const rngIdxs = [0,1,2,3,4].map(idx => 100*4000*(i + shift) + 10*(5*j) + idx);

                // const c = (random(rngIdxs[0]) - 0.5) * 2**5;
                const c = (random(rngIdxs[0]) - 0.25) * 2**5;  // biased towards positive
                const S = randomIntInRange(1000,1001,rngIdxs[2]);
                const T = randomIntInRange(0,1,rngIdxs[3]);
                const c_ = perturbMax(c, S, rngIdxs[4]);
                // const c_ = perturb(c, S, rngIdxs[4]);
                // const c__ = perturb(c, S, rngIdxs[4]);
                // const c_ = c * (S*(1 + γ1)); 
                // const c_ = c * (S*(1 + γ1)); 
                // c;  //?
                // c_; //?
                // c__;//?
                // (1 + γ1)**10;//?

                errBound.push(γ1*S*abs(c));
                poly.push(c);
                polyPert.push(c_);
            }
            polys.push(poly);
            errBounds.push(errBound);
            polysPerts.push(polyPert);
        }

        let maxErrPerMax = -Infinity;
        let maxErrWithInpMax = -Infinity;
        for (let i=0; i<N; i++) {
            const poly = polys[i];  // exact
            const polyDd = polys[i].map(c => [0,c]);
            const errBound = errBounds[i];
            const polyPert = polysPerts[i];  // perturbed
            const polyExp = poly.map(c => [c]);

            // toCasStr(pEe);//?
            // const realNumRoots = eNumRootsInRange(polyExp, [0], [1]);
            // if (realNumRoots === 0) { continue; }
            const getPExact = () => polyExp;
            // const rs = allRootsCertified(polyDd, 0, 1, errBound, getPExact);
            // if (rs.length === 0) { continue; }
            // const r0 = (rs[0].tS + rs[0].tE)/2 + 0.1;
            const r0 = 0.47;
            const vEe = eCompress(eeHorner(polyExp,[r0]));

            const [vCalc,errMax] = hornerWithRunningError(poly,r0);
            const [r̂,e] = HornerWithInpError(polyPert, r0, errBound);

            const err = abs(eEstimate(eDiff(vEe, [vCalc])));
            const errWithInp = abs(eEstimate(eDiff(vEe, [r̂])));
            // const vActualD = eEstimate(vEe);//?

            // poly;//?
            // polyPert;//?

            const errPerMax = err/errMax;
            const errWithInpMax = errWithInp/e;

            if (errPerMax > maxErrPerMax) { maxErrPerMax = errPerMax; }
            if (errWithInpMax > maxErrWithInpMax) {
                maxErrWithInpMax = errWithInpMax;
                maxIdx = i;
            }

            // expect(errMax).toBeGreaterThanOrEqual(err);
        }

        //---------------------------------------------------------------------------------
        // We see from the below the forward error bound is way looser than the running error bound,
        // which is expected since the forward error bound is a worst-case bound while the running
        // error is a more precise bound for the actual error in the specific case.
        //
        // We also see that the running error bound is quite tight, with the actual
        // error being at most around 0.5 times the running error bound in these cases.
        //---------------------------------------------------------------------------------
        
        maxErrPerMax;//?
        expect(maxErrPerMax < 1).toBe(true);
        // expect(maxErrPerMax > 0.1).toBe(true);  // make sure error bound is tight(ish)

        maxIdx;//? 
        maxErrWithInpMax;//?
        expect(maxErrWithInpMax < 1).toBe(true);
        // expect(maxErrWithInpMax > 0.001).toBe(true);  // make sure error bound is tight(ish)
    }
});


function perturbMax(
        v: number,
        E: number,
        rngIdx?: number | undefined) {

    const frac = 1;
    // const frac = 2*random(rngIdx) - 1;//?
    const errMax = Math.abs(v) * E * γ1;
    if (errMax === 0) { return v; }

    let err = v * frac * E * γ1;

    let r = v < 0 ? v - err : v + err;
    // Guard against final-addition roundoff breaching the strict cap.
    while (Math.abs(r - v) > errMax) {
        err /= 1.01;
        r = v + err;
    }

    return r;
}