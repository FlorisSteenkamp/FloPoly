
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { rootMagnitudeUpperBound_fujiwara } from '../../../src/index.js';


describe('rootMagnitudeUpperBound_fujiwara', function() {
	it('should correctly calculate upper bound magnitudes for the roots of some polynomials', 
	function() {
		let p1 = [2,-3,6,5,-130];
		let p2: number[] = [];
		let p3 = [3];
		// real roots at about -2.397918624065303 and 2.8793785310848383
		expect(rootMagnitudeUpperBound_fujiwara(p1)).to.equal(6.753296750770361);
		// real roots everywhere
		expect(rootMagnitudeUpperBound_fujiwara(p2)).to.equal(0);
		// real roots nowhere
		expect(rootMagnitudeUpperBound_fujiwara(p3)).to.equal(0);
	});
});