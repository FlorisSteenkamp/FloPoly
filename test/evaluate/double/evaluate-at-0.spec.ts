
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { evaluateAt0, Horner } from '../../../src/index.js';


describe('evaluateAt0', function() {
	it('should evaluate some polynomials correctly at 0', 
	function() {
		let p1 = [0.1,0.2,0.3,2,3,5,11.11];
        let p2 = [0.1,0.2,0.3,2,3,5,0];
        let p3: number[] = [];
        
		expect(evaluateAt0(p1)).to.equal(11.11);
		expect(evaluateAt0(p2)).to.equal(0);
		expect(evaluateAt0(p1)).to.equal(Horner(p1,0));
        expect(evaluateAt0(p2)).to.equal(Horner(p2,0));
        expect(evaluateAt0(p3)).to.equal(0);
	});
});