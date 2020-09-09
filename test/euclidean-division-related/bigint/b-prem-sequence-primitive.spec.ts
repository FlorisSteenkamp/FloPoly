
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bPremSequencePrimitive } from '../../../src/index';


describe('bPremSequencePrimitive', function() {
	it('should correctly calculate the primitive pseudo remainder sequence of two polynomials (with bigint coefficients)',
	function() {
        {
            const ps = [
                [1n,0n,1n,0n,-3n,-3n,8n,2n,-5n],
                [3n,0n,5n,0n,-4n,-9n,21n]
            ];

            {
                let r = bPremSequencePrimitive(ps[0], ps[1]);
                expect(r).to.deep.equal([
                    [1n, 0n, 1n, 0n, -3n, -3n, 8n, 2n, -5n],
                    [3n, 0n, 5n, 0n, -4n, -9n, 21n],
                    [5n, 0n, -1n, 0n, 3n],
                    [13n, 25n, -49n],
                    [4663n, -6150n],
                    [1n]
                ]);
            }
        }
	});
});
