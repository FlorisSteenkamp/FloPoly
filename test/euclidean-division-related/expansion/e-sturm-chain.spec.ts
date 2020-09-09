
import { assert, expect } from 'chai';
import { eSturmChain } from '../../../src/index';


describe('eSturmChain', function() {
	it('should correctly calculated the Sturm chain of some polynomials with coefficients given as Shewchuk expansions', 
	function() {
        {
            // This is the Wikipediaexample
            // a = x^8 + x^6 - 3x^4 - 3x^3 + 8x^2 + 2x - 5
            let a = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
            let seq = eSturmChain(a);
            expect(seq).to.eql([
                [[1],[0],[1],[0],[-3],[-3],[8],[2],[-5]],
                [[8],[0],[6],[0],[-12],[-9],[16],[2]],
                [[-16],[-0],[96],[120],[-384],[-112],[320]],
                [[-216],[-240],[816],[260],[-704],[-8]],
                [[-2880],[-30600],[56580],[30864],[-58200]],
                [[4491000],[-6811980],[-4566000],[7384200]],
                [[-1487162545],[-114239000],[1712340550]],
                [[-126627790896],[93912590625]],
                [[-5869831203567]]
            ]);
        }
    });
});

