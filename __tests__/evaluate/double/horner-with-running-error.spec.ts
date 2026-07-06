import { describe, expect, it } from '@jest/globals';
import { eCompress, eDiff, eEstimate } from 'big-float-ts';
import { hornerWithRunningError } from '../../../src/evaluate/double/horner-with-running-error.js';
import { toCasStr } from '../../../src/basic/to-cas-str.js';
import { allRootsCertifiedSimplified } from '../../../src/roots/certified/all-roots-certified-simplified.js';
import { eeHorner } from '../../../src/evaluate/expansion/e-e-horner.js';
import { getPolysUsing9PerturbedRoots } from '../../get-polys-using-9-perturbed-roots.js';
import { eNumRootsInRange } from '../../../src/roots/sturm/expansion/e-num-roots-in-range.js';
import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { getPolys_BezierIntersections } from '../../get-poly.js';
import { AbsHorner } from '../../../src/evaluate/double/abs-horner.js';
import { γ, γγ3 } from '../../../src/error-analysis/gamma.js';


const { abs } = Math;


describe('`hornerWithRunningError`', function() {
    it('should evaluate some polynomials correctly (with their error) at some values', 
    function() {
        const p1 = [0.1,0.2,0.3,2,3,5,11.11];
        const p2 = [0.1,0.2,0.3,2,3,5,0];
        
        const p11_ = hornerWithRunningError(p1,3);
        const p21_ = hornerWithRunningError(p2,2.2);
        const p12_ = hornerWithRunningError(p1,1.002);
        const p22_ = hornerWithRunningError(p2,1212);
        
        expect(p11_).toEqual([252.91000000000003, 2.4393931319366407e-13]);
        expect(p21_).toEqual([75.4889344, 6.298927033299153e-14]);
        expect(p12_).toEqual([21.749657257644827, 6.821482641739818e-15]);
        expect(p22_).toEqual([317491919306866370, 422.92591894871236]);
    });

    {
        const p = [
            3.3493091049511645,
            -10.312785158563559,
            12.09953698080592,
            -5.342992725063621,
            -2.252212549505455,
            0.8923265010697978,
            4.547079925683724,
            -4.6927651291532,
            1.7364806043080092,
            -0.22455623255290014
        ];
        // toCasStr(p);//?
        allRootsCertifiedSimplified(p, 0,2);

        const almostRoot1 = 0.33617428290360230;
        const almostRoot2 = 0.33617428290360233;
        const [v1,errMax1] = hornerWithRunningError(p,almostRoot1);
        const [v2,errMax2] = hornerWithRunningError(p,almostRoot2);

        const pEe = p.map(c => [c]);
        const vEe1 = eCompress(eeHorner(pEe,[almostRoot1]));
        const vEe2 = eCompress(eeHorner(pEe,[almostRoot2]));

        const err1 = abs(eEstimate(eDiff(vEe1, [v1])));
        const err2 = abs(eEstimate(eDiff(vEe2, [v2])));

        expect(errMax1).toBeGreaterThanOrEqual(err1);
        expect(errMax2).toBeGreaterThanOrEqual(err2);
    }

    // {
    //     //---------------------------------
    //     // Hard cases
    //     //---------------------------------
    //     const N = 0;
    //     const polys = getPolysUsing9PerturbedRoots(N, 10, 0, 0.44);
    //     for (let i=0; i<N; i++) {
    //         const { pDd, pD, EsDd, errBound, getPExact } = polys[i];
    //         const pEe = getPExact();
    //         // toCasStr(pEe);//?
    //         // const realNumRoots = eNumRootsInRange(pEe, [0], [1]);

    //         const rs = allRootsCertified(pDd, 0, 1, errBound, getPExact);
    //         // const rsB = roots(pDd, 0, 1, EsDd, getPExact);
    //         const r0 = (rs[0].tS + rs[0].tE)/2;

    //         const [v,errMax] = hornerWithRunningError(pD,r0);
    //         const vEe = eCompress(eeHorner(pEe,[r0]));
    //         const err = abs(eEstimate(eDiff(vEe, [v])));

    //         expect(errMax).toBeGreaterThanOrEqual(err);
    //     }
    // }

    {
        //---------------------------------
        // Easy cases
        //---------------------------------
        const N = 100;
        const shift = 0;
        const polys = getPolys_BezierIntersections(N, shift);
        let maxErrPerMaxForward = -Infinity;
        let maxErrPerMax = -Infinity;
        for (let i=0; i<N; i++) {
            const { pDd, p, pDd_, getPExact } = polys[i];
            const errBound = pDd_.map(c => c*γγ3);
            const pEe = getPExact();
            // toCasStr(pEe);//?
            const realNumRoots = eNumRootsInRange(pEe, [0], [1]);
            if (realNumRoots === 0) { continue; }

            const rs = allRootsCertified(pDd, 0, 1, errBound, getPExact);
            const r0 = (rs[0].tS + rs[0].tE)/2;

            const [vCalc,errMax] = hornerWithRunningError(p,r0);//?
            const vEe = eCompress(eeHorner(pEe,[r0]));
            const err = abs(eEstimate(eDiff(vEe, [vCalc])));
            const vActualD = eEstimate(vEe);

            const d = p.length - 1;
            const errMaxForward = γ(2*d)*AbsHorner(p,abs(r0));//?

            const errPerMaxForward = err/errMaxForward;//?
            const errPerMax = err/errMax;//?

            if (errPerMax > maxErrPerMax) { maxErrPerMax = errPerMax; }
            if (errPerMaxForward > maxErrPerMaxForward) { maxErrPerMaxForward = errPerMaxForward; }

            expect(errMax).toBeGreaterThanOrEqual(err);
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
        maxErrPerMaxForward;//?
        expect(maxErrPerMax < 1).toBe(true);
        // expect(maxErrPerMax > 0.5).toBe(true);  // make sure error bound is tight(ish)
        expect(maxErrPerMaxForward < 1).toBe(true);
        expect(maxErrPerMaxForward > 0.01).toBe(true);  // make sure error bound is tight(ish)
    }
});