import { describe, expect, it } from '@jest/globals';

import { bEvaluateAt0 } from '../../../src/evaluate/bigint/b-evaluate-at-0.js';
import { bHorner } from '../../../src/evaluate/bigint/b-horner.js';


describe('bEvaluateAt0', function() {
	it('should evaluate some polynomials correctly at 0', 
	function() {
		let p1 = [1n,2n,3n,2n,3n,5n,11n];
        let p2 = [1n,2n,3n,2n,3n,5n,0n];
        let p3: bigint[] = [];
        
		expect(bEvaluateAt0(p1)).toEqual(11n);
		expect(bEvaluateAt0(p2)).toEqual(0n);
		expect(bEvaluateAt0(p1)).toEqual(bHorner(p1,0n));
        expect(bEvaluateAt0(p2)).toEqual(bHorner(p2,0n));
        expect(bEvaluateAt0(p3)).toEqual(0n);
	});
});