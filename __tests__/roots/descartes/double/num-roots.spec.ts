import { describe, expect, it } from '@jest/globals';
import { numRoots } from '../../../../src/roots/sturm/double/num-roots.js';
import { fromRoots } from '../../../../src/roots/from-roots/double/from-roots.js';


describe('numRoots', function() {
    it('should correctly calculate the number of roots of some polynomials',
    function() {
        {
            let p = [1, 1, -64, 236, -240];
            expect(numRoots(p)).toEqual(4);
        }
        {
            const p = fromRoots([-1, -1, -1, 2, 3, 4]);
            expect(numRoots(p)).toEqual(4);
        }
        {
            const p = fromRoots([-1, 2, 2, 2, 3, 4]);
            expect(numRoots(p)).toEqual(4);
        }
    });

    it('should correctly calculate the number of roots when the Sturm chain has degree drops of 2 or more',
    function() {
        // Regression: a degree drop >= 2 in the chain made the subresultant
        // divisor `D` negative which flipped the sign of later chain entries
        {
            // x(9x^4 + 2x + 5) - only real root is x = 0
            expect(numRoots([9, 0, 0, 2, 5, 0])).toEqual(1);
        }
        {
            // x(10x^4 + 10x^3 + 4x^2 + 3x + 6) - only real root is x = 0
            expect(numRoots([10, 10, 4, 3, 6, 0])).toEqual(1);
        }
        {
            // x^4 - 1 - real roots are ±1
            expect(numRoots([1, 0, 0, 0, -1])).toEqual(2);
        }
    });

    it('should handle constant, zero and leading-zero polynomials',
    function() {
        expect(numRoots([])).toEqual(Infinity);
        expect(numRoots([0])).toEqual(Infinity);
        expect(numRoots([5])).toEqual(0);
        expect(numRoots([0, 1, -2])).toEqual(1);
        expect(numRoots([1, -2, 1])).toEqual(1);  // (x-1)^2
    });
});


