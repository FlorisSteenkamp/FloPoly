
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { equal, multiply } from '../../../src/index';


describe('multiply', function() {
	it('should correctly multiply some polynomials with double precision coefficients',
	function() {
		let p1 = [2];
		let p2: number[] = [];
		let p3 = [1,2,3];
		let p4 = [4,4,5,6,7];
		assert(equal(multiply(p1,p3), [2,4,6]));
		assert(equal(multiply(p2,p3), []));
		assert(equal(multiply(p3,p4), [4, 12, 25, 28, 34, 32, 21]));
	});
});