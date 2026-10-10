import { describe, expect, it } from '@jest/globals';
import { eNumRoots } from '../../../../src/roots/sturm/expansion/e-num-roots.js';


describe('eNumRoots', function() {
    it('should correctly calculate the number of roots of some polynomials', 
    function() {
        {
            let p = [1, 1, -64, 236, -240].map(x => [x]);
            expect(eNumRoots(p)).toEqual(4);
        }
    });

    it('should correctly calculate the number of roots when the Sturm chain has degree drops of 2 or more',
    function() {
        // Regression: a degree drop >= 2 in the chain made the subresultant
        // divisor `D` negative which flipped the sign of later chain entries
        {
            // x(9x^4 + 2x + 5) - only real root is x = 0
            expect(eNumRoots([9, 0, 0, 2, 5, 0].map(x => [x]))).toEqual(1);
        }
        {
            // x(10x^4 + 10x^3 + 4x^2 + 3x + 6) - only real root is x = 0
            expect(eNumRoots([10, 10, 4, 3, 6, 0].map(x => [x]))).toEqual(1);
        }
        {
            // x^4 - 1 - real roots are ±1
            expect(eNumRoots([1, 0, 0, 0, -1].map(x => [x]))).toEqual(2);
        }
    });
});
