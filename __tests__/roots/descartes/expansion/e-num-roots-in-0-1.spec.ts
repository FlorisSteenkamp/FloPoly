import { describe, expect, it } from '@jest/globals';
import { eMultiply } from '../../../../src/basic/expansion/e-multiply.js';
import { eNumRootsIn01 } from '../../../../src/roots/sturm/expansion/e-num-roots-0-1.js';


describe('eNumRootsIn01', function() {
    it('should correctly calculate the number of roots within the closed interval [0,1] for some polynomials',
    function() {
        {
            let p = [1, 1, -64, 236, -240].map(x => [x]);
            expect(eNumRootsIn01(p)).toEqual(0);
        }
        
        {
            let p = [[1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
            expect(eNumRootsIn01(p)).toEqual(1);
        }
        {
            let p = [[-1], [0], [1], [0], [-3], [-3], [8], [2], [-5]];
            expect(eNumRootsIn01(p)).toEqual(0);
        }
        {
            let p = [[-1], [0], [-1], [0], [+3], [-3], [8], [2], [-5]];
            expect(eNumRootsIn01(p)).toEqual(1);
        }
        
        // overflow destroys `eNumRootsIn01` below ):
        
        /*
        {
            let p1 = eMultiply([[1],[-0.5]], [[1],[-0.3]]);
            let p2 = eMultiply([[1],[-0.1]], [[1],[-0.9]]);
            let p3 = eMultiply([[1],[-0.2]], [[1],[-0.99]]);
            let p4 = eMultiply([[1],[-0.01]], [[1],[-0.09]]);
            let p5 = eMultiply(p1, p2);
            let p6 = eMultiply(p3, p4);
            let p7 = eMultiply(p5, p6);
            expect(eNumRootsIn01(p7)).toEqual(8);
        }
        {
            let k = -0.001;
            let p1 = eMultiply([[1],[k*1]], [[1],[k*5]]);
            let p2 = eMultiply([[1],[k*2]], [[1],[k*6]]);
            let p3 = eMultiply([[1],[k*3]], [[1],[k*7]]);
            let p4 = eMultiply([[1],[k*4]], [[1],[k*8]]);
            let p5 = eMultiply(p1, p2);
            let p6 = eMultiply(p3, p4);
            let p7 = eMultiply(p5, p6);
            expect(eNumRootsIn01(p7)).toEqual(8);
        }
        */
    });

    it('should count multiple roots at the endpoints once and handle degenerate polynomials',
    function() {
        expect(eNumRootsIn01([[1], [-4], [5], [-2]])).toEqual(1);  // (x-1)^2 (x-2)
        expect(eNumRootsIn01([[1], [0], [0]])).toEqual(1);         // x^2
        expect(eNumRootsIn01([])).toEqual(Infinity);
        expect(eNumRootsIn01([[0]])).toEqual(Infinity);
        expect(eNumRootsIn01([[5]])).toEqual(0);
        expect(eNumRootsIn01([[0], [2], [-1]])).toEqual(1);       // 2x - 1
    });
});
