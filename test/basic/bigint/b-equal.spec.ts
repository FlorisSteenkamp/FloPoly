
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEqual } from '../../../src/index';


describe('bEqual', function() {
	it('should check some polynomials with bigint coefficients are correctly given as equal or not', 
	function() {
		let p1 = [10n, 5n];
		let p2 = [10n, 5n];
		let p3 = [10n, 6n];
		let p4 = [1n, 10n, 6n];
		let p5: bigint[] = [];
		let p6: bigint[] = [];
		
		assert( bEqual(p1,p2)); 
		assert(!bEqual(p1,p3));
		assert(!bEqual(p3,p4));
		assert( bEqual(p5,p6));
		assert(!bEqual(p1,p6));
	});
});
