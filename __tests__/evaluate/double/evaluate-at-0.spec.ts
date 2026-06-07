import { describe, expect, it } from '@jest/globals';

import { evaluateAt0 } from '../../../src/evaluate/double/evaluate-at-0.js';
import { Horner } from '../../../src/evaluate/double/horner.js';


describe('evaluateAt0', function() {
	it('should evaluate some polynomials correctly at 0', 
	function() {
		let p1 = [0.1,0.2,0.3,2,3,5,11.11];
        let p2 = [0.1,0.2,0.3,2,3,5,0];
        let p3: number[] = [];
        
		expect(evaluateAt0(p1)).toEqual(11.11);
		expect(evaluateAt0(p2)).toEqual(0);
		expect(evaluateAt0(p1)).toEqual(Horner(p1,0));
        expect(evaluateAt0(p2)).toEqual(Horner(p2,0));
        expect(evaluateAt0(p3)).toEqual(0);
	});
});