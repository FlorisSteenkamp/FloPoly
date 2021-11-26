import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEqual, ddIntegrate } from '../../../src/index.js';


describe('ddIntegrate', function() {
	it('should integrate some polynomials with double-double precision coefficients correctly', 
	function() {
		let p1: number[][] = [];
		let p3 = [[0,3], [0,2], [0,1]];
        ddIntegrate(p1, [0,99])//?
		assert(eEqual(ddIntegrate(p1, [0,99]), [[0,99]]));
		assert(eEqual(ddIntegrate(p3, [0,99]), [[0,1], [0,1], [0,1], [0,99]]));
	});
});
