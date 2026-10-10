import { describe, expect, it } from '@jest/globals';

import { eSturmChain } from '../../../src/euclidean-division-related/expansion/e-sturm-chain.js';


describe('eSturmChain', function() {
    it('should correctly calculated the Sturm chain of some polynomials with coefficients given as Shewchuk expansions', 
    function() {
        {
            // This is the Wikipediaexample
            // a = x^8 + x^6 - 3x^4 - 3x^3 + 8x^2 + 2x - 5
            let a = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
            let seq = eSturmChain(a);
            expect(seq).toEqual([
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
        {
            // Regression: a degree drop of 3 between the 2nd and 3rd entries
            // makes the subresultant divisor `D` negative - the sign of the
            // last entry must still be correct (it was negated before).
            // p = x(9x^4 + 2x + 5)
            const seq = eSturmChain([[9], [0], [0], [2], [5], [0]]);
            expect(seq.map(p => p.map(c => c[c.length-1]))).toEqual([
                [9, 0, 0, 2, 5, 0],
                [45, 0, 0, 4, 5],
                [-2430, -8100, -0],
                [261810144, -787320],
                [5240926800]
            ]);
        }
    });

    it('should handle constant, zero and leading-zero polynomials',
    function() {
        // Regression: constant and zero polynomials previously threw
        expect(eSturmChain([])).toEqual([]);
        expect(eSturmChain([[0]])).toEqual([]);
        expect(eSturmChain([[0], [0]])).toEqual([]);
        expect(eSturmChain([[5]])).toEqual([[[5]]]);
        expect(eSturmChain([[0], [0], [5]])).toEqual([[[5]]]);
        expect(eSturmChain([[0], [-3], [4], [2], [-2]])).toEqual([
            [[-3], [4], [2], [-2]],
            [[-9], [8], [2]],
            [[-204], [138]],
            [[-1692]]
        ]);
    });
});

