import { describe, expect, it } from '@jest/globals';
import { add } from '../../../src/basic/double/add.js';


describe('add', function() {
    it('should add some polynomials with double precision coefficients correctly', 
    function() {
        const p1 = [3,4];
        const p2 = [1,2,3];
        const p3 = [3,2,1];
        const p4 = [0];
        const p5: number[] = [];
        expect(add(p1,p2)).toEqual([1,5,7]);
        expect(add(p2,p1)).toEqual([1,5,7]);
        expect(add(p3,p2)).toEqual([4,4,4]);
        expect(add(p2,p3)).toEqual([4,4,4]);
        expect(add(p4,p5)).toEqual([]);
        expect(add(p5,p4)).toEqual([]);
    });

    it('should add identical polynomials', function() {
        const p = [1,2,3,4];
        expect(add(p,p)).toEqual([2,4,6,8]);
    });

    it('should add polynomial to itself multiple times', function() {
        const p = [2,3];
        expect(add(add(p,p),p)).toEqual([6,9]);
    });

    it('should handle single-coefficient polynomials', function() {
        const p1 = [5];
        const p2 = [3];
        expect(add(p1,p2)).toEqual([8]);
        expect(add(p1,[0])).toEqual([5]);
    });

    it('should handle negative coefficients', function() {
        const p1 = [1,-2,3];
        const p2 = [-1,2,-3];
        expect(add(p1,p2)).toEqual([]);
        expect(add(p1,[1,2,-3])).toEqual([2,0,0]);
    });

    it('should handle large degree polynomials', function() {
        const p1 = [1,0,0,0,0,2];
        const p2 = [0,0,0,0,0,3];
        expect(add(p1,p2)).toEqual([1,0,0,0,0,5]);
    });

    it('should cancel leading terms correctly', function() {
        const p1 = [1,2,3,4];
        const p2 = [-1,0,0,0];
        expect(add(p1,p2)).toEqual([2,3,4]);
    });

    it('should be commutative', function() {
        const p1 = [1,2,3];
        const p2 = [4,5];
        expect(add(p1,p2)).toEqual(add(p2,p1));
    });

    it('should be associative', function() {
        const p1 = [1,2];
        const p2 = [3,4];
        const p3 = [5,6];
        expect(add(add(p1,p2),p3)).toEqual(add(p1,add(p2,p3)));
    });
});
