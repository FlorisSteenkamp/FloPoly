
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { eHorner } from '../../../src/index';

// see also the file: e-e-horner.spec.ts

describe('eHorner', function() {
	it('should evaluate some polynomials correctly at some values', 
	function() {
		let p1 = [[0.1],[0.2],[0.3],[2],[3],[5],[11.11]];
        let p2 = [[0.1],[0.2],[0.3],[2],[3],[5],[0]];
        
        let p11_ = eHorner(p1,3);
        let p21_ = eHorner(p2,2.2);
        let p12_ = eHorner(p1,1.002);
        let p22_ = eHorner(p2,1212);

		expect(p11_).to.eql([
            -1.942890293094024e-16, 
            8.881784197001252e-15, 
            252.91 
        ]);
		expect(p21_).to.eql([
            4.495487958736633e-97,
            -9.363352709384397e-97,
            4.870583160859408e-81,
            7.840999250105116e-65,
            -5.17604620259792e-50,
            9.579188720970429e-48,
            8.758115402030107e-47,
            1.1035848519679886e-31,
            1.947661942836024e-15,
            75.48893440000002
        ]);
		expect(p12_).to.eql([
            -6.166475531702373e-99,
            -4.389071582523936e-98,
            -9.3596170035852e-83,
            -2.6068886538050257e-65,
            7.253854064884257e-50,
            2.711293100914021e-33,
            -4.132134491358769e-16,
            -1.7763568394002505e-15,
            21.749657257644827
        ]);
		expect(p22_).to.eql([
            7.224281858557887, 
            317491919306866300 
        ]);
	});
});