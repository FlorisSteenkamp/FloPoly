
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { maxCoefficient } from '../src/index';


describe('maxCoefficient', function() {
	it('should correctly calculate the maximum coefficient of some polynomials', 
	function() {
		let p1 = [1e-10,1e-12,1];
		let p2 = [1e-3,1e-12,1e-10];
		let p3 = [1e-3,1e-1,1e-10];
		expect(maxCoefficient(p1)).to.equal(1);
		expect(maxCoefficient(p2)).to.equal(1e-3);
		expect(maxCoefficient(p3)).to.equal(1e-1);
	});
});