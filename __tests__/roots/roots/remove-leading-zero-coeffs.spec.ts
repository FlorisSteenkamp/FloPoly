import { describe, expect, it } from '@jest/globals';

import { removeLeadingZeroCoeffs } from '../../../src/roots/remove-leading-zero-coeffs.js';
import { γγ3 } from '../../../src/error-analysis/gamma.js';
import { eCompress } from 'big-float-ts';
import { makeFakeGetPExact } from '../make-fake-get-p-exact.js';


describe('removeLeadingZeros', function() {
    it('should correctly remove leading zeros of some polynomials with double precision coefficients', 
    function() {
        {
            // coefficients in double-double precision
            let pDd = [
                [0, 0],  // zero leading coefficient
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

            // coefficient-wise error bound of double-double precision coefficients
            let pDd_ = [
                1e-19,
                5.973763369817942e-16,
                3.154260190691488e-15,
                1.0432584785199789e-14,
                2.0265321429548282e-14,
                3.236053769569458e-14,
                3.1173345325629133e-14,
                2.228376621708172e-14,
                1.2374462883419778e-14,
                3.82255386973334e-15,
                5.160968273258298e-16
            ];

            // create fake `getPExact`
            const getPExact = makeFakeGetPExact(pDd, false);
            let pExact: number[][] | undefined = getPExact();

            ({ pDd, pDd_, pExact } = removeLeadingZeroCoeffs(pDd, pDd_, getPExact, 1));//?

            expect(pDd.length).toEqual(10);
            expect(pExact!.length).toEqual(10);
            expect(pDd_.length).toEqual(10);
        }
        {
            //-----------------------------
            // Leading coeff to be removed
            //-----------------------------
            const pE = [
                [0],
                [7.099748146989106],
                [-6.500013562306921e-34, -1.198283124034812e-17, -1.1832913578315176]
            ];
            const pDd = [
                [0,0],
                [3.608224830031759e-16, 7.1],
                [3.187539634858146e-16, -6.499999999765827]
            ];
            const pDd_ = [1, 1];

            const r = removeLeadingZeroCoeffs(pDd, pDd_, () => pE, γγ3);//?

            expect(r).toEqual({
                pDd: [[0, 7.099748146989106], [-1.198283124034812e-17, -1.1832913578315176 ]],
                pDd_: [7.099748146989106, 1.1832913578315176],
                pExact: [
                    [7.099748146989106],
                    [-6.500013562306921e-34, -1.198283124034812e-17, -1.1832913578315176]
                ]
            });
        }
        {
            const pE = [
                [0.000000000000000000000000000000007099748146989106],
                [7.099748146989106],
                [-6.500013562306921e-34, -1.198283124034812e-17, -1.1832913578315176]
            ];
            const pDd = [
                [0,0],
                [3.608224830031759e-16, 7.1],
                [3.187539634858146e-16, -6.499999999765827]
            ];
            const pDd_ = [1, 1];

            const r = removeLeadingZeroCoeffs(pDd, pDd_, () => pE, γγ3);

            expect(r).toEqual({
                pDd: [
                    [0, 7.099748146989106e-33],
                    [0, 7.099748146989106],
                    [-1.198283124034812e-17, -1.1832913578315176]
                ],
                pDd_: [7.099748146989106e-33, 7.099748146989106, 1.1832913578315176],
                pExact: [
                    [7.099748146989106e-33],
                    [7.099748146989106],
                    [-6.500013562306921e-34, -1.198283124034812e-17, -1.1832913578315176]
                ]
            });
        }
        {
            const pE = [
                [7.099748146989106],
                [-6.500013562306921e-34, -1.198283124034812e-17, -1.1832913578315176]
            ];
            const pDd = [
                [3.608224830031759e-16, 7.1],
                [3.187539634858146e-16, -6.499999999765827]
            ];
            const pDd_ = [1, 1];

            const r = removeLeadingZeroCoeffs(pDd, pDd_, () => pE, γγ3);//?

            expect(r).toEqual({
                pDd,
                pDd_,
                pExact: undefined
            });
        }
        {
            const pE = [
                [7.099748146989106e-30],
                [-1.1832913578315177e-30, -1.201518026378512e-13]
            ];
            const pDd = [[0,0],[0,0]];
            const p = pDd.map(c => c[1]);
            const pDd_ = [8805996.472572096, 4402998.236286048];

            const r = removeLeadingZeroCoeffs(pDd, pDd_, () => pE, γγ3);

            expect(r).toEqual({
                pDd: [
                    [ 0, 7.099748146989106e-30 ],
                    [ -1.1832913578315177e-30, -1.201518026378512e-13 ]
                ],
                pDd_: [ 7.099748146989106e-30, 1.201518026378512e-13 ],
                pExact: [
                    [ 7.099748146989106e-30 ],
                    [ -1.1832913578315177e-30, -1.201518026378512e-13 ]
                ]
            });
        }
    });
});