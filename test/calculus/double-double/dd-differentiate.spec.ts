
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, ddDifferentiate } from '../../../src/index';


describe('ddDifferentiate', function() {
	it('should differentiate some polynomials with double-double precision coefficients correctly', 
	function() {
		let p1: number[][] = [];
		let p2 = [[0,1]];
		let p3 = [[0,5], [0,4], [0,3], [0,2], [0,1]];
		assert(eEqual(ddDifferentiate(p1), []));
		assert(eEqual(ddDifferentiate(p2), []));
		assert(eEqual(ddDifferentiate(p3), [[0,20], [0,12], [0,6], [0,2]]));
	});
});