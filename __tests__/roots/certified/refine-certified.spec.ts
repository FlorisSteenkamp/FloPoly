import { describe, expect, it } from '@jest/globals';
import { refineCertified } from '../../../src/roots/refine-certified.js';
import { eCompress, eEstimate } from 'big-float-ts';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { getPolys_BezierIntersections } from '../../get-poly.js';
import { roots } from '../../../src/roots/descartes/roots.js';
import { eHorner } from '../../../src/evaluate/expansion/e-horner.js';
import { getPolyFromRoots } from '../../get-polys-from-roots.js';
import { eFromRoots } from '../../../src/roots/from-roots/expansion/e-from-roots.js';

const { abs } = Math;


describe('refineCertified', function() {
    it('should generally return the best estimate of the root as `t`',
    function() {
        {
            //--------------------------------------------------------------------------
            // NOTE: We simply test `roots` since it calls `refineCertified` internally
            //--------------------------------------------------------------------------

            // find roots within a typical range
            const lb = 0;
            const ub = 2**0;

            /** number of polynomials to find roots of */
            const N = 10;
            const shift = 0;

            //------------------------------------------------------------------
            // create intersection polynomials from the generated cubic beziers
            //------------------------------------------------------------------
            const timeStartCoeffs = performance.now();
            const polys = getPolys_BezierIntersections(N, shift);

            const _roots_ = [0.001,0.002,0.003,0.004,0.005,3,5,10,100].map(r => 0.0625/(2*4) + r/16);
            const testPoly = getPolyFromRoots(_roots_);
            polys[0] = testPoly;
            
            // toCasStr(polys[0].pDd.map(coef => coef.map(v => v*2**-90)));//?

            //------------------------------------------------------------------
            // find all roots of all generated polynomials using `isolateRoots`
            //------------------------------------------------------------------
            let numIso = 0;
            for (let i=0; i<N; i++) {
                // const { pDd, errBoundUnscaledDd, getPExact } = polys[i];
                const { pDd, pDd_, getPExact } = polys[i];
                const rs = roots(pDd, lb, ub, pDd_, getPExact, false)!;

                for (let j=0; j<rs.length; j++) {
                    const { t, tS, tE, multiplicity } = rs[j];
                    const T = abs(eEstimate(eHorner(getPExact(), t)));
                    const TS = abs(eEstimate(eHorner(getPExact(), tS)));
                    const TE = abs(eEstimate(eHorner(getPExact(), tE)));
                    // t; //?
                    // tS;//?
                    // tE;//?
                    // T; //?
                    // TS;//?
                    // TE;//?

                    expect(T <= TS).toBe(true);
                    expect(T <= TE).toBe(true);
                }
            
                numIso += rs ? rs!.length : 0;
            }
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
            //     const numRoots = Number.isFinite(lb) && Number.isFinite(ub)
            //         ? bNumRootsInRange(bCoeffs_, BigInt(lb), BigInt(ub))
            //         : bNumRoots(bCoeffs_);

            //     exactNumRoots += numRoots;
            // }
        }
        {
            {
                const _roots = [...Array(50+1).keys()].slice(1).map(c => [c]);
                const { pDd, pDd_, pE } = eFromRoots(_roots);
                const getPExact = () => pE;
                const rs = roots(pDd,0,71,pDd_,getPExact)!;
                // rs;//?
                const p = [1, -21, 175, -735, 1624, -1764, 720];
                roots(p)!.map(r => r.t);//?
                // => [
                //    { tS: 1, tE: 1, multiplicity: 1 },
                //    { tS: 2, tE: 2, multiplicity: 1 },
                //    .
                //    .
                //    .
                //    { tS: 70, tE: 70, multiplicity: 1 }
                // ]
            }
        }
    });
});
