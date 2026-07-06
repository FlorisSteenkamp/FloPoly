import { test, describe, expect, it } from '@jest/globals';
import { squares } from 'squares-rng';
import { ddDiffDd, ddAbs, ddAddDd, ddMultDouble2 as ddMultD } from 'double-double';
import { taylorShift } from '../../../src/change-variables/double/taylor-shift.js';
import { calcTaylorShift_ErrorCounters } from '../../../src/roots/mobius/calc-taylor-shift-error-counters.js';
import { γ1 } from '../../../src/error-analysis/gamma.js';
import { perturb } from '../../../src/error-analysis/perturb.js';
import { randomIntInRange } from '../../../src/error-analysis/random-int-in-range.js';
import { absCoeff } from '../../../src/basic/double/abs-coeff.js';

const { max, abs } = Math;


test('`taylorShift` error calculations', function() {
    const N = 100;
    const eRelsMaxs: number[] = [];
    const MIN_E = 1;
    const MAX_E = 20;
    const shift = 0;
    const h = 0.125;  // must be a power of 2 for `taylorShiftAbs` to be exact
    for (let i=0; i<N; i++) {
        const _p = Array.from({ length: 10 }, (_,idx) => 2**10*squares(20*(i+shift) + idx));

        const _Es = Array.from({ length: 10 }, (_,idx) => randomIntInRange(MIN_E, MAX_E, 20*(i+shift) + 1 + idx));
        
        const p = _p.map((c,idx) => perturb(c, _Es[idx], 20*(i+shift) + 15));

        const n = p.length - 1;
        const pS = taylorShift(p, h);  // approx

        const pSdd = ddTaylorShiftD(_p, h);  // exact(ish)
        const pErr = pS.map((c,idx) => {
            const a = ddDiffDd([0,c], pSdd[idx]);
            return ddAbs(a);
        })
        .map(v => v[0] + v[1]);

        const q_ = taylorShift(absCoeff(p), h);
        const Es = calcTaylorShift_ErrorCounters(_Es);

        let esMax = Es.map((E,idx) => E*γ1*q_[idx]);

        const esRel = esMax.map((e,idx) => (e === 0 && pErr[idx] === 0) ? 0.5 : abs(pErr[idx]) / e);
        const eRelMax = max(...esRel);
        eRelsMaxs.push(eRelMax);
    }
    const eRelssMax = max(...eRelsMaxs);

    eRelssMax;//?
    expect(eRelssMax).toBeLessThan(1);
    expect(eRelssMax).toBeGreaterThanOrEqual(0.1);  // just so we know our bound is tight(ish)
});


function ddTaylorShiftD(
        p: number[],
        h: number): number[][] {

    const n = p.length - 1;
    if (n < 0) { return []; }

    // `q` is consumed in place; the successive remainders are the Taylor
    // coefficients of `f` about `h`, i.e. the coefficients of `f(x + h)`.
    const q = p.map(c => [0,c]);
    for (let k=0; k<=n; k++) {
        for (let i=1; i<=n - k; i++) {
            q[i] = ddAddDd(q[i], ddMultD(h, q[i - 1]));
        }
    }

    return q;
}