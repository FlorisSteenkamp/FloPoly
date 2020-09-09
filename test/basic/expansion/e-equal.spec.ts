
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual } from '../../../src/index';


describe('eEqual', function() {
	it('should check some polynomials with Shewchuk expansion coefficients are correctly given as equal or not', 
	function() {
		let p1 = [[1e10], [1e5]];
		let p2 = [[1e10], [1e5]];
		let p3 = [[1e10], [1e6]];
		let p4 = [[1], [1e10], [1e6]];
		let p5: number[][] = [];
		let p6: number[][] = [];
		
		assert( eEqual(p1,p2)); 
		assert(!eEqual(p1,p3));
		assert(!eEqual(p3,p4));
		assert( eEqual(p5,p6));
		assert(!eEqual(p1,p6));
	});
});
