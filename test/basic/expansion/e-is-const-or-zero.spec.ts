
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eIsConstOrZero } from '../../../src/index';


describe('eIsConstOrZero', function() {
	it('should correctly report some polynomials as being a constant or the zero polynomial', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
		let p3 = [[0.000000000000000000001, 3]];
		let p4 = [[4],[3],[2],[1]];
		assert( eIsConstOrZero(p1));
		assert( eIsConstOrZero(p2));
		assert( eIsConstOrZero(p3));
		assert(!eIsConstOrZero(p4));
	});
});