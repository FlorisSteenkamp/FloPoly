import { test, describe, expect, it } from '@jest/globals';
import { eCompress, eDiff, eEstimate } from 'big-float-ts';
import { γ1 } from '../../../src/error-analysis/gamma.js';
import { randomIntInRange } from '../../../src/error-analysis/random-int-in-range.js';
import { random } from '../../../src/error-analysis/random.js';
import { eScale } from '../../../src/change-variables/expansion/e-scale.js';
import { scaleWithInpErr } from '../../../src/change-variables/double/scale-with-inp-err.js';

const { abs } = Math;


test('`scaleWithInpErr`', function() {
    {
        const N = 100;
        const shift = 0;

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

                const c = (random(rngIdxs[0]) - 0.5) * 2**5;
                const S = randomIntInRange(5,5,rngIdxs[2]);
                const c_ = perturbMax(c, S);

                errBound.push(γ1*S*abs(c));
                poly.push(c);
                polyPert.push(c_);
            }
            polys.push(poly);
            errBounds.push(errBound);
            polysPerts.push(polyPert);
        }
        //---------------------------------------------------------------------

        const errMaxs = polys[0].map(_ => -Infinity);  // per coefficient
        for (let i=0; i<N; i++) {
            const poly = polys[i];  // exact
            const errBound = errBounds[i];
            const polyPert = polysPerts[i];  // perturbed
            const polyExp = poly.map(c => [c]);

            // toCasStr(pEe);//?
            const s0 = 5.47;
            const vsEe = eScale(polyExp,s0).map(eCompress);//?

            const [r̂,r̂_] = scaleWithInpErr(polyPert, s0, errBound);
            r̂;
            r̂_;

            const es = vsEe.map((vEe,idx) => abs(eEstimate(eDiff(vEe, [r̂[idx]]))));//?
            // const r̂$ = eEstimate(vEe);//?

            // poly;    //?
            // polyPert;//?

            const errWithInpMaxs = poly.map((_,idx) => es[idx]/r̂_[idx]);

            for (let idx=0; idx<errWithInpMaxs.length; idx++) {
                const errWithInpMax = errWithInpMaxs[idx];
                if (errWithInpMax > errMaxs[idx]) {
                    errMaxs[idx] = errWithInpMax;
                    maxIdx = i;
                }
            }
        }

        //---------------------------------------------------------------------------------
        //
        //---------------------------------------------------------------------------------
        maxIdx;//? 
        errMaxs;//?
        const errMax = Math.max(...errMaxs);//?
        expect(errMax < 1).toBe(true);
        // expect(maxErrWithInpMax > 0.001).toBe(true);  // make sure error bound is tight(ish)
    }
});


function perturbMax(
        v: number,
        E: number) {

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