
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { bEvaluateAt0, bHorner } from '../../../src/index';


describe('bEvaluateAt0', function() {
	it('should evaluate some polynomials correctly at 0', 
	function() {
		let p1 = [1n,2n,3n,2n,3n,5n,11n];
        let p2 = [1n,2n,3n,2n,3n,5n,0n];
        let p3: bigint[] = [];
        
		expect(bEvaluateAt0(p1)).to.equal(11n);
		expect(bEvaluateAt0(p2)).to.equal(0n);
		expect(bEvaluateAt0(p1)).to.equal(bHorner(p1,0n));
        expect(bEvaluateAt0(p2)).to.equal(bHorner(p2,0n));
        expect(bEvaluateAt0(p3)).to.equal(0n);
	});
});