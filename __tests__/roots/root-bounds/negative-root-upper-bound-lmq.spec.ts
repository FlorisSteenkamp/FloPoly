import { describe, expect, it } from '@jest/globals';

import { negativeRootUpperBound_LMQ } from '../../../src/roots/root-bounds/root-bounds-lmq.js';


describe('negativeRootUpperBound_LMQ', function() {
	it('should correctly find bounds of some polynomial roots', 
	function() {
		let p1 = [2,-3,6,5,-130];
		let p2: number[] = [];
		let p3 = [3];
		// real roots at about -2.397918624065303 and 2.8793785310848383
		expect(negativeRootUpperBound_LMQ(p1)).toEqual(-1.6883241876925903);
		// real roots everywhere
		expect(negativeRootUpperBound_LMQ(p2)).toEqual(Number.NEGATIVE_INFINITY);
		// real roots nowhere
		expect(negativeRootUpperBound_LMQ(p3)).toEqual(Number.NEGATIVE_INFINITY);
	});
});