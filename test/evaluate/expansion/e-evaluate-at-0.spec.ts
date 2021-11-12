
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEvaluateAt0, Horner, eHorner } from '../../../src/index.js';


describe('eEvaluateAt0', function() {
	it('should evaluate some polynomials correctly at 0', 
	function() {
		let p1 = [[0.1],[0.2],[0.3],[2],[3],[5],[11.11]];
        let p2 = [[0.1],[0.2],[0.3],[2],[3],[5],[0]];
        let p3: number[][] = [];
        
		expect(eEvaluateAt0(p1)).to.eql([11.11]);
		expect(eEvaluateAt0(p2)).to.eql([0]);
		expect(eEvaluateAt0(p1)).to.eql(eHorner(p1,0));
        expect(eEvaluateAt0(p2)).to.eql(eHorner(p2,0));
        expect(eEvaluateAt0(p3)).to.eql([0]);
	});
});