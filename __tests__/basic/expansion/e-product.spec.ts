import { describe, expect, it } from '@jest/globals';

import { eEqual } from '../../../src/basic/expansion/e-equal.js';
import { eProduct } from '../../../src/basic/expansion/e-product.js';


describe('eProduct', function() {
    it('should correctly multiply some polynomials with Shewchuk expansion coefficients',
    function() {
        let p1 = [[2]];
        let p2: number[][] = [];
        let p3 = [[1],[2],[3]];
        let p4 = [[4],[4],[5],[6],[7]];
        expect(eEqual(eProduct([]), [[1]])).toEqual(true);
        expect(eEqual(eProduct([p1,p3]), [[2],[4],[6]])).toEqual(true);
        expect(eEqual(eProduct([p2,p3]), [])).toEqual(true);
        expect(eEqual(eProduct([p3,p4]), [[4], [12], [25], [28], [34], [32], [21]])).toEqual(true);
    });
});