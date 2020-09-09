
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, eIsUnit } from '../../../src/index';


describe('eIsUnit', function() {
	it('should correctly report some polynomials as being the unit polynomial', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
		let p3 = [[4],[3],[2],[1]];
		assert(!eIsUnit(p1));
		assert( eIsUnit(p2));
		assert(!eIsUnit(p3));
	});
});