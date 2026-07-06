import { describe, expect, it } from '@jest/globals';
import { eEstimate } from 'big-float-ts';
// import { allRootsCertified } from '../../../src/roots/certified/all-roots-certified.js';
import { refineK1 } from '../../../src/roots/certified/refine-k1.js';
import { eHorner } from '../../../src/evaluate/expansion/e-horner.js';
import { eeHorner } from '../../../src/evaluate/expansion/e-e-horner.js';
import { roots } from '../../../src/roots/descartes/roots.js';
import { eFromRoots } from '../../../src/roots/from-roots/expansion/e-from-roots.js';
import { eps } from '../../../src/error-analysis/gamma.js';

const { abs } = Math;


describe('refineK1 - refine a given root bracket - typically to roughly double-double precision',
function() {
    it('should refine some root brackets of some polynomial(s) correctly',
    function() {
        {
            //-----------------------------------------------------------
            // Test resolve "double" root interval to 2 seperate intervals
            //-----------------------------------------------------------
            const { p, pDd, p_, pDd_, pE } = eFromRoots([
                [0.3], [eps/8192, 0.3], [0.5],
                [0.6], [0.7], [0.8],
                [0.9], [1], [1.3], [1.3]
            ]);
            const rs = roots(pDd, -Infinity, Infinity, pDd_, () => pE)!;
            // rs[0] === { tS: 0.2999999999999998, tE: 0.30000000000000016, multiplicity: 2 }
            // rs[0];//?

            const splitRoots = refineK1(rs[0], pE);

            expect(splitRoots).toStrictEqual([
                {
                    tS: [ -9.860761315262648e-32, 0.3 ],
                    tE: [ 9.860761315262648e-32, 0.3 ],
                    multiplicity: 1
                },
                {
                    tS: [ 2.7105054312039003e-20, 0.3 ],
                    tE: [ 2.710505431223622e-20, 0.3 ],
                    multiplicity: 1
                }
            ]);
        }
        {
            //-------------------------------------------------------
            // Test reduce root interval by around `1/(2*eps)` times
            //-------------------------------------------------------
            // coefficients in double-double (and Shewchuk expansion) precision
            const p = [
                [0.1580350755837278, 3770986809251668.5],
                [-0.437621888289444, -11611163849314706],
                [0.37925906415346655, 13622867559528270],
                [-0.18215364304839451, -6015675011409949],
                [-0.2113068076998193, -2535765899677980.5],
                [-0.03234301695064162, 1004670324427690],
                [-0.13228935570003014, 5119556864733271],
                [0.46839905715354696, -5283583821747902],
                [-0.0020342528097285484, 1955103350624411],
                [-0.004629837980953938, -252827841312240.88]
            ];

            // coefficients in double precision
            const pD = [
                3770986809251668.5,
                -11611163849314706,
                13622867559528270,
                -6015675011409949,
                -2535765899677980.5,
                1004670324427690,
                5119556864733271,
                -5283583821747902,
                1955103350624411,
                -252827841312240.88
            ];

            // coefficientwise error bound of double-double precision 
            // coefficients
            // const pDd_ = [
            //     5.973763369817942e-16,
            //     3.154260190691488e-15,
            //     1.0432584785199789e-14,
            //     2.0265321429548282e-14,
            //     3.236053769569458e-14,
            //     3.1173345325629133e-14,
            //     2.228376621708172e-14,
            //     1.2374462883419778e-14,
            //     3.82255386973334e-15,
            //     5.160968273258298e-16
            // ];

            const lb = -50;
            const ub = 100;
            // const ts = allRootsCertified(p, lb, ub, pE, undefined);
            const ts = roots(p, lb, ub/*, pDd_*/)!;
            
            // ts should be around:
            // [
            //     { tS: 0.3361742829036018, tE: 0.336174282903602, multiplicity: 1 },
            //     { tS: 0.6260997031130031, tE: 0.6260997031130033, multiplicity: 1 },
            //     { tS: 1.3255582424034447, tE: 1.3255582424034453, multiplicity: 1 }
            // ]

            const t0_ = (ts[0].tS + ts[0].tE) / 2;
            const t0 = refineK1(ts[0], p);//?
            
            // t0 should be around:
            // [{
            //     tS: [ -1.981540274258879e-17, 0.3361742829036019 ],
            //     tE: [ -1.981540274258874e-17, 0.3361742829036019 ],
            //     multiplicity: 1
            // }]
            //
            // with original bracket width = 2.220446049250313e-16 = eps

            const t1_ = (ts[1].tS + ts[1].tE) / 2;
            const t1 = refineK1(ts[1], p);

            // ts1 should be around:
            // [{
            //     tS: [ -1.8639464158577974e-17, 0.6260997031130033 ],
            //     tE: [ -1.8639464158577925e-17, 0.6260997031130033 ],
            //     multiplicity: 1
            // }]
            //
            // with original bracket width = 2.220446049250313e-16 = eps

            const t2_ = (ts[2].tS + ts[2].tE) / 2;
            const t2 = refineK1(ts[2], p);

            // ts2 should be around:
            // {
            //     tS: [ -3.4604248197914546e-17, 1.3255582424034453 ],
            //     tE: [ -3.460424819791435e-17, 1.3255582424034453 ],
            //     multiplicity: 1
            // }
            //
            // with original bracket width = 6.661338147750939e-16 = 3*eps

            
            // Non-compensated: Check values around root has higher abs value than root
            const C0L = abs(eEstimate(eHorner(p,t0_ - 2*Number.EPSILON)));
            const C0  = abs(eEstimate(eHorner(p,t0_)));
            const C0R = abs(eEstimate(eHorner(p,t0_ + 2*Number.EPSILON)));
            expect(C0L > C0).toEqual(true);
            expect(C0R > C0).toEqual(true);
            
            // Compensated once (K1): Check values around root has higher abs value than root
            const tS = t0[0].tS.slice();
            const tSL = [tS[0] - 2*Number.EPSILON**2, tS[1]];
            const tSR = [tS[0] + 2*Number.EPSILON**2, tS[1]];
            const C1SL = abs(eEstimate(eeHorner(p,tSL)));
            const C1S  = abs(eEstimate(eeHorner(p,tS)));
            const C1SR = abs(eEstimate(eeHorner(p,tSR)));
            expect(C1SL > C1S).toEqual(true);
            expect(C1SR > C1S).toEqual(true);

            // Compensated once (K1): Check values around root has higher abs value than root
            const tE = t0[0].tE.slice();
            const tEL = [tE[0] - 2*Number.EPSILON**2, tE[1]];
            const tER = [tE[0] + 2*Number.EPSILON**2, tE[1]];
            const C1EL = abs(eEstimate(eeHorner(p,tEL)));
            const C1E  = abs(eEstimate(eeHorner(p,tE)));
            const C1ER = abs(eEstimate(eeHorner(p,tER)));
            expect(C1EL > C1E).toEqual(true);
            expect(C1ER > C1E).toEqual(true);
        }
    });
});
