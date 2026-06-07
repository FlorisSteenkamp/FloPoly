import { describe, expect, it } from '@jest/globals';

import { eIsRationalMultipleOf } from '../../../src/basic/expansion/e-is-rational-multiple-of.js';
import { twoProduct } from 'big-float-ts';


describe('eIsRationalMultipleOf', function() {
	it('should correctly check if some polynomials are rational multiples of some others', 
	function() {
		let p1: number[][] = [];
		let p2 = [[1]];
        let p3 = [[4],[3],[2],[1]];
		let p4 = p3.map(c => twoProduct(c[0], 7.0001220703125));
		let p5 = p3.map(c => twoProduct(c[0], -3));
		let p6 = [[-1]];
		let p7 = [[5]];
        
		// everything is a rational multiple of the empty polynomial
		expect(eIsRationalMultipleOf(p1, p1)).toBeTruthy();
        expect(eIsRationalMultipleOf(p1, p2)).toBeTruthy();
        expect(eIsRationalMultipleOf(p1, p3)).toBeTruthy();
		expect(eIsRationalMultipleOf(p1, p4)).toBeTruthy();
		expect(eIsRationalMultipleOf(p1, p5)).toBeTruthy();
		expect(eIsRationalMultipleOf(p1, p6)).toBeTruthy();
		expect(eIsRationalMultipleOf(p1, p7)).toBeTruthy();

		expect(eIsRationalMultipleOf(p2, p1)).toBeTruthy();
        expect(eIsRationalMultipleOf(p3, p1)).toBeTruthy();
		expect(eIsRationalMultipleOf(p4, p1)).toBeTruthy();
		expect(eIsRationalMultipleOf(p5, p1)).toBeTruthy();
		expect(eIsRationalMultipleOf(p6, p1)).toBeTruthy();
		expect(eIsRationalMultipleOf(p7, p1)).toBeTruthy();
		
		// p3, p4 and p5 are rational multiples of each other
		expect(eIsRationalMultipleOf(p3, p3)).toBeTruthy();
        expect(eIsRationalMultipleOf(p3, p4)).toBeTruthy();
		expect(eIsRationalMultipleOf(p3, p5)).toBeTruthy();
		expect(eIsRationalMultipleOf(p4, p4)).toBeTruthy();
		expect(eIsRationalMultipleOf(p4, p5)).toBeTruthy();
		expect(eIsRationalMultipleOf(p5, p5)).toBeTruthy();

		expect(eIsRationalMultipleOf(p4, p3)).toBeTruthy();
		expect(eIsRationalMultipleOf(p5, p3)).toBeTruthy();
		expect(eIsRationalMultipleOf(p5, p4)).toBeTruthy();
		
		// p2, p6 and p7 are not rational multiples of p3, p4, p5
		expect(!eIsRationalMultipleOf(p2, p3)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p2, p4)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p2, p5)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p6, p3)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p6, p4)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p6, p5)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p7, p3)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p7, p4)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p7, p5)).toBeTruthy();

		expect(!eIsRationalMultipleOf(p3, p2)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p4, p2)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p5, p2)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p3, p6)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p4, p6)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p5, p6)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p3, p7)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p4, p7)).toBeTruthy();
		expect(!eIsRationalMultipleOf(p5, p7)).toBeTruthy();

		// p2, p6 and p7 are rational multiples of each other
		expect(eIsRationalMultipleOf(p2, p2)).toBeTruthy();
		expect(eIsRationalMultipleOf(p2, p6)).toBeTruthy();
		expect(eIsRationalMultipleOf(p2, p7)).toBeTruthy();
		expect(eIsRationalMultipleOf(p6, p6)).toBeTruthy();
		expect(eIsRationalMultipleOf(p6, p7)).toBeTruthy();
		expect(eIsRationalMultipleOf(p7, p7)).toBeTruthy();

		expect(eIsRationalMultipleOf(p6, p2)).toBeTruthy();
		expect(eIsRationalMultipleOf(p7, p2)).toBeTruthy();
		expect(eIsRationalMultipleOf(p7, p6)).toBeTruthy();

		// close but p8[0] is 1 too big
		let p8 = [[34677717130752820], [26008287848064616], [17338858565376410], [8669429282688205]];
		expect(!eIsRationalMultipleOf(p3, p8)).toBeTruthy();

		let p9 = [[8],[6],[4],[4]];
		expect(!eIsRationalMultipleOf(p3, p9)).toBeTruthy();
	});
});