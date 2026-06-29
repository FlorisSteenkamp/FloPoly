import { describe, expect, it } from '@jest/globals';

import { eAdd } from '../../../src/basic/expansion/e-add.js';


describe('eAdd', function() {
    it('should add some polynomials with Shewchuk expansion coefficients correctly', 
    function() {
        let p1 = [[3],[4]];
        let p2 = [[1],[2],[3]];
        let p3 = [[3],[2],[1]];
        expect(eAdd(p1,p2)).toEqual([[1],[5],[7]]);
        expect(eAdd(p2,p1)).toEqual([[1],[5],[7]]);
        expect(eAdd(p3,p2)).toEqual([[4],[4],[4]]);
    });
});