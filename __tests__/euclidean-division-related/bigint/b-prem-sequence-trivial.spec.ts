import { describe, expect, it } from '@jest/globals';

import { bPremSequenceTrivial } from '../../../src/euclidean-division-related/bigint/b-prem-sequence-trivial.js';
import { bMultiply } from '../../../src/basic/bigint/b-multiply.js';


describe('bPremSequenceTrivial', function() {
	it('should correctly calculate the trivial pseudo remainder sequence of two polynomials (with bigint coefficients)',
	function() {
        {
            const ps = [
                [1n,0n,1n,0n,-3n,-3n,8n,2n,-5n],
                [3n,0n,5n,0n,-4n,-9n,21n]
            ];

            {
                let r = bPremSequenceTrivial(ps[0], ps[1]);
                expect(r).toEqual([
                    [1n, 0n, 1n, 0n, -3n, -3n, 8n, 2n, -5n],
                    [3n, 0n, 5n, 0n, -4n, -9n, 21n],
                    [-15n, 0n, 3n, 0n, -9n],
                    [15795n, 30375n, -59535n],
                    [1254542875143750n, -1654608338437500n],
                    [12593338795500743100931141992187500n]
                ]);
            }
        }


        {
            let p1 = [2n,-3n,6n,5n,-130n];
            let p2 = [3n,4n,-2n];
            let p = bMultiply(p1,p2);

            let r = bPremSequenceTrivial(p, p2);

            expect(r).toEqual([
                [6n, -1n, 2n, 45n, -382n, -530n, 260n],
                [3n, 4n, -2n]
            ]);
        }
	});
});
