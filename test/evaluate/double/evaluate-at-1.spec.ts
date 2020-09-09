
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { evaluateAt1, Horner } from '../../../src/index';


describe('evaluateAt1', function() {
	it('should evaluate some polynomials correctly at 1', 
	function() {
		let p1 = [0.1,0.2,0.3,2,3,5,11.11];
        let p2 = [0.1,0.2,0.3,2,3,5,0];
        let p3: number[] = [];
        
        let p1_ = evaluateAt1(p1);
        let p2_ = evaluateAt1(p2);
        let p1$ = Horner(p1,1);
        let p2$ = Horner(p2,1);

		expect(p1_).to.equal(p1$);
        expect(p2_).to.equal(p2$);
        expect(evaluateAt1(p3)).to.equal(0);
	});
});