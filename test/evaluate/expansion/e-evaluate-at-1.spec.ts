
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eEvaluateAt1, eHorner } from '../../../src/index';


describe('eEvaluateAt1', function() {
	it('should evaluate some polynomials correctly at 1', 
	function() {
		let p1 = [[0.1],[0.2],[0.3],[2],[3],[5],[11.11]];
        let p2 = [[0.1],[0.2],[0.3],[2],[3],[5],[0]];
        let p3: number[][] = [];
        
        let p1_ = eEvaluateAt1(p1);
        let p2_ = eEvaluateAt1(p2);
        let p1$ = eHorner(p1,1);
        let p2$ = eHorner(p2,1);

		expect(p1_).to.eql(p1$);
        expect(p2_).to.eql(p2$);
        expect(eEvaluateAt1(p3)).to.eql([0]);
	});
});