
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { AbsHorner } from '../../../src/index';

// see also the file: e-e-horner.spec.ts

describe('AbsHorner', function() {
	it('should evaluate some polynomials (with all coefficients taken as their absolute value) correctly at some values',
	function() {
		let p1 = [-0.1,0.2,0.3,2,3,5,11.11];
		let p2 = [0.1,-0.2,-0.3,-2,-3,5,0];
		
		expect(AbsHorner(p1,3)).to.equal(252.91000000000003);
		expect(AbsHorner(p2,2.2)).to.equal(75.4889344);
		expect(AbsHorner(p1,1.002)).to.equal(21.749657257644827);
		expect(AbsHorner(p2,1212)).to.equal(317491919306866370);
	});
});