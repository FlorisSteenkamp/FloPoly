import { describe, expect, it } from '@jest/globals';
import { ddAdd } from '../../../src/basic/double-double/dd-add.js';


describe('ddAdd', function() {
    it('should add some polynomials with double-double precision coefficients correctly', 
    function() {
        const p1 = [[0,3],[0,4]];
        const p2 = [[8*Number.EPSILON,1],[0,2],[0,3]];
        const p3 = [[0,3],[0,2],[0,1]];
        const p4 = [[0,0]];
        const p5: number[][] = [];
        expect(ddAdd(p1,p2)).toEqual([[8*Number.EPSILON,1],[0,5],[0,7]]);
        expect(ddAdd(p2,p1)).toEqual([[8*Number.EPSILON,1],[0,5],[0,7]]);
        expect(ddAdd(p3,p2)).toEqual([[0,4.000000000000002],[0,4],[0,4]]);
        expect(ddAdd(p2,p3)).toEqual([[0,4.000000000000002],[0,4],[0,4]]);
        expect(ddAdd(p4,p5)).toEqual([]);
        expect(ddAdd(p5,p4)).toEqual([]);
    });

    it('should ddAdd identical polynomials', function() {
        const p = [[0,1],[0,2],[0,3],[0,4]];
        expect(ddAdd(p,p)).toEqual([[0,2],[0,4],[0,6],[0,8]]);
    });

    it('should ddAdd polynomial to itself multiple times', function() {
        const p = [[0,2],[0,3]];
        expect(ddAdd(ddAdd(p,p),p)).toEqual([[0,6],[0,9]]);
    });

    it('should handle single-coefficient polynomials', function() {
        const p1 = [[0,5]];
        const p2 = [[0,3]];
        expect(ddAdd(p1,p2)).toEqual([[0,8]]);
        expect(ddAdd(p1,[[0,0]])).toEqual([[0,5]]);
    });

    it('should handle negative coefficients', function() {
        const p1 = [[0,1],[0,-2],[0,3]];
        const p2 = [[0,-1],[0,2],[0,-3]];
        expect(ddAdd(p1,p2)).toEqual([]);
        expect(ddAdd(p1,[[0,1],[0,2],[0,-3]])).toEqual([[0,2],[0,0],[0,0]]);
    });

    it('should handle large degree polynomials', function() {
        const p1 = [[0,1],[0,0],[0,0],[0,0],[0,0],[0,2]];
        const p2 = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,3]];
        expect(ddAdd(p1,p2)).toEqual([[0,1],[0,0],[0,0],[0,0],[0,0],[0,5]]);
    });

    it('should cancel leading terms correctly', function() {
        const p1 = [[0,1],[0,2],[0,3],[0,4]];
        const p2 = [[0,-1],[0,0],[0,0],[0,0]];
        expect(ddAdd(p1,p2)).toEqual([[0,2],[0,3],[0,4]]);
    });

    it('should be commutative', function() {
        const p1 = [[0,1],[0,2],[0,3]];
        const p2 = [[0,4],[0,5]];
        expect(ddAdd(p1,p2)).toEqual(ddAdd(p2,p1));
    });

    it('should be associative', function() {
        const p1 = [[0,1],[0,2]];
        const p2 = [[0,3],[0,4]];
        const p3 = [[0,5],[0,6]];
        expect(ddAdd(ddAdd(p1,p2),p3)).toEqual(ddAdd(p1,ddAdd(p2,p3)));
    });
});
