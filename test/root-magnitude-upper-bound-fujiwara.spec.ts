
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { rootMagnitudeUpperBound_fujiwara } from '../src/index';


describe('rootMagnitudeUpperBound_fujiwara', function() {
	it('should correctly calculate upper bound magnitudes for the roots of some polynomials', 
	function() {
		let p = [2,-3,6,5,-130];

		expect(rootMagnitudeUpperBound_fujiwara(p)).to.equal(6.753296750770361);
	});
});