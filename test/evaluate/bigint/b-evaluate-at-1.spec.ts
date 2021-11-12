
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEvaluateAt1, bHorner } from '../../../src/index.js';


describe('evaluateAt1', function() {
	it('should evaluate some polynomials correctly at 1', 
	function() {
		let p1 = [1n,2n,3n,2n,3n,5n,11n];
        let p2 = [1n,2n,3n,2n,3n,5n,0n];
        let p3: bigint[] = [];
        
        let p1_ = bEvaluateAt1(p1);
        let p2_ = bEvaluateAt1(p2);
        let p1$ = bHorner(p1,1n);
        let p2$ = bHorner(p2,1n);

		expect(p1_).to.equal(p1$);
        expect(p2_).to.equal(p2$);
        expect(bEvaluateAt1(p3)).to.equal(0n);
	});
});