
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bHorner } from '../../../src/index';


describe('bHorner', function() {
	it('should evaluate some polynomials (with bigint coefficients) correctly at some bigint values', 
	function() {
        // 5*x^4 - 4*x^3 + 3*x^2 - 2*x + 1
		let p1 = [5n,-4n,3n,-2n,1n];
		let p2: bigint[] = [];
		
        assert(bHorner(p1,3n) === 319n);
        assert(bHorner(p1,-3n) === 547n);
		assert(bHorner(p2,2n) === 0n);
		assert(bHorner(p1,-20n) === 833241n);
	});
});