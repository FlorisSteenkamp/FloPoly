
import { bSturmChain } from '../../../src/index.js';
import { assert, expect } from 'chai';
import { describe } from 'mocha';


describe('bSturmChain', function() {
	it('should calculate the sturm chain of some polynomials with bigint coefficients correctly', 
	function() {
        {
            // This is the Wikipedia example https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor
            // a = x^8 + x^6 - 3x^4 - 3x^3 + 8x^2 + 2x - 5
            let a = [1n, 0n, 1n, 0n, -3n, -3n, 8n, 2n, -5n];
            let polys = bSturmChain(a);
            expect(polys).to.eql([
                [1n,0n,1n,0n,-3n,-3n,8n,2n,-5n],
                [8n,0n,6n,0n,-12n,-9n,16n,2n],
                [-16n,-0n,96n,120n,-384n,-112n,320n],
                [-216n,-240n,816n,260n,-704n,-8n],
                [-2880n,-30600n,56580n,30864n,-58200n],
                [4491000n,-6811980n,-4566000n,7384200n],
                [-1487162545n,-114239000n,1712340550n],
                [-126627790896n,93912590625n],
                [-5869831203567n]
            ]);
        }
        {
            let a = [-3n,4n,2n,-2n];
            let polys = bSturmChain(a);
            expect(polys).to.eql([
                [-3n, 4n, 2n, -2n],
                [-9n, 8n, 2n],
                [-204n, 138n],
                [-1692n]
            ]);
        }
    });
});

