import { describe, expect, it } from '@jest/globals';

import { equal } from '../../../src/basic/double/equal.js';
import { flatRootsArr } from '../../../src/predictive-random/double/random.js';


describe('random.flatRootsArr', function() {
    it('should predictably generate an array of polynomials with roots in a flat random distribution', 
    function() {
        let res: number[][];
        
        res = flatRootsArr(2,3,0,10);
        expect(equal(res[0], [1, -17.445259802043438, 96.94898590669898, -172.1346546982741])).toEqual(true);
        expect(equal(res[1], [1, -21.424386776052415, 143.23055474890413, -283.0801374912826])).toEqual(true);
        
        res = flatRootsArr(2,3,0,10);
        expect(equal(res[0], [1, -17.445259802043438, 96.94898590669898, -172.1346546982741])).toEqual(true);
        expect(equal(res[1], [1, -21.424386776052415, 143.23055474890413, -283.0801374912826])).toEqual(true);
        
        res = flatRootsArr(2,3,0,10,undefined,0.5);
        expect(equal(res[0], [1, -16.311874534003437, 88.69241693768994, -160.74884191167996])).toEqual(true);
        expect(equal(res[1], [1, -9.593948035035282, 9.447599020838812, -2.4616200548274745])).toEqual(true);
    });
});