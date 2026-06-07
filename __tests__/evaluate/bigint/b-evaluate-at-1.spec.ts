import { describe, expect, it } from '@jest/globals';

import { bEvaluateAt1 } from '../../../src/evaluate/bigint/b-evaluate-at-1.js';
import { bHorner } from '../../../src/evaluate/bigint/b-horner.js';


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

		expect(p1_).toEqual(p1$);
        expect(p2_).toEqual(p2$);
        expect(bEvaluateAt1(p3)).toEqual(0n);
	});
});