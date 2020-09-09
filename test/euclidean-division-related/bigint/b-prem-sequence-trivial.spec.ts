
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bPremSequenceTrivial } from '../../../src/index';


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
                expect(r).to.deep.equal([
                    [1n, 0n, 1n, 0n, -3n, -3n, 8n, 2n, -5n],
                    [3n, 0n, 5n, 0n, -4n, -9n, 21n],
                    [-15n, 0n, 3n, 0n, -9n],
                    [15795n, 30375n, -59535n],
                    [1254542875143750n, -1654608338437500n],
                    [12593338795500743100931141992187500n]
                ]);
            }
        }
	});
});
