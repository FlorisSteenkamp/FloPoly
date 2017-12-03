'use strict'

var mocha;
var chai;
var helper;
var FloPoly;

if (typeof require === 'undefined') {
	// Browser
} else {
	// Node
	mocha   = require('mocha');
	chai    = require('chai');
	helper  = require('./helpers/helper.js');
	FloPoly = require('../../node/index.js').default;
}


var { assert, expect } = chai;
var { evaluate, allRoots, hornerErrorBound, fromRoots } = FloPoly;
var { flatRootsArr, flatCoefficientsArr, flatCoefficients } = FloPoly.random;
var { rootsAccurateEnough, numsWithin } = helper;

describe('allRoots', function() {
	it('should not return roots that doesn\'t fall in the given left half-open range', 
	function() {
		let p;
		let roots;
		
		p = [1, 0.7, -0.28, 0.02];
		roots = allRoots(p,undefined,0);
		assert(
			roots.length === 1 &&
			numsWithin(roots, Number.NEGATIVE_INFINITY, 0), 
			'Roots not correct - roots: [' + roots + '] - should be [-1]'
		);
	});
	
	
	it('should not return roots that doesn\'t fall in the given right half-open range', 
	function() {
		let p;
		let roots;
		
		p = [1, 0.7, -0.28, 0.02];
		roots = allRoots(p,0,undefined);
		assert(
			roots.length === 2 &&
			numsWithin(roots, 0, Number.POSITIVE_INFINITY), 
			'Roots not correct - roots: [' + roots + '] - should be [0.1,0.2]'
		);
	});
	
	it('should not return roots that doesn\'t fall in the given closed range', 
	function() {
		let p;
		let roots;
		
		p = [1, 0.7, -0.28, 0.02];
		roots = allRoots(p,0,2);
		assert(
			roots.length === 2 &&
			numsWithin(roots, 0, 2), 
			'Roots not correct - roots: [' + roots + '] - should be [0.1, 0.2]'
		);
	});
	
	it('should return no roots for a zero polynomial', 
	function() {
		let p = [];

		let roots;
		roots = allRoots(p);
		expect(roots).to.be.an('array').that.is.empty;
	});
	
	it('should return no roots for a non-zero constant polynomial', 
	function() {
		let p = [2.2];

		let roots;
		roots = allRoots(p);
		expect(roots).to.be.an('array').that.is.empty;
	});
	
	it('should calculate some simple linear polynomial roots accurately', 
	function() {
		let p = [0.1,2.2];

		let roots;
		roots = allRoots(p);
		assert(
			rootsAccurateEnough(p,[-22]), 
			'Roots not correct'
		);
	});
	
	it('should calculate some simple quadratic roots accurately', 
	function() {
		let p;
		let roots;
		
		p = [1,-3,2];
		roots = allRoots(p);
		expect(roots[0]).to.equal(1);
		expect(roots[1]).to.equal(2);
		
		p = [1, -1.1, 0.3];
		roots = allRoots(p);
		expect(roots[0]).to.equal(0.49999999999999944);
		expect(roots[1]).to.equal(0.6000000000000006);
	});
	
	it('should calculate some simple cubic roots accurately', 
	function() {
		let p;
		let roots;
		
		p = [1, 0.7, -0.28, 0.02];
		roots = allRoots(p);
		assert(
			rootsAccurateEnough(p,[-1, 0.1, 0.2]), 
			'Roots not correct'
		);
	});
	
	it(
	`should calculate the roots correctly for hundreds of polynomials each
	with reproducable random roots (in a flat distribution from -10 to 
	10) of order 3,4,7,12,15, and 20 that only have real roots`, 
	function() {
		const N = 100;
		const orders = [3,4,7,12,15,20];
		let pss = [
			flatRootsArr(N, orders[0], -10, 10, 11111),
			flatRootsArr(N, orders[1], -10, 10, 22222),
			flatRootsArr(N, orders[2], -10, 10, 33333),
			flatRootsArr(N, orders[3], -10, 10, 44444),
			flatRootsArr(N, orders[4], -10, 10, 55555),
			flatRootsArr(N, orders[5], -10, 10, 66666),
		];
		
		for (let i=0; i<pss.length; i++) {
			for (let j=0; j<pss[i].length; j++) {
				let p = pss[i][j];
				let roots = allRoots(p);
				
				assert.equal(p.length-1, orders[i]);
				assert(rootsAccurateEnough(p,roots), 'Roots not correct');
			}
		}
	});
	
	
	it(`should calculate the roots correctly for hundreds of polynomials each
		with reproducable random coefficients (in a flat distribution from -10 to 
		10) of order 3,4,7,12,15, and 20`, 
	function() {
		const N = 100;
		const orders = [3,4,7,12,15,20];
		let pss = [
			flatCoefficientsArr(N, orders[0], -10, 10, 11111),
			flatCoefficientsArr(N, orders[1], -10, 10, 22222),
			flatCoefficientsArr(N, orders[2], -10, 10, 33333),
			flatCoefficientsArr(N, orders[3], -10, 10, 44444),
			flatCoefficientsArr(N, orders[4], -10, 10, 55555),
			flatCoefficientsArr(N, orders[5], -10, 10, 66666),
		];
		
		for (let i=0; i<pss.length; i++) {
			for (let j=0; j<pss[i].length; j++) {
				let p = pss[i][j];
				let roots = allRoots(p);
				
				//assert.equal(p.length-1, orders[i]);
				assert(rootsAccurateEnough(p,roots), 'Roots not correct');
			}
		}
	});
	
	
	it(`should not miss a near triple or higher odd degree root for hundreds
		of predictable random polynomials designed to have these kinds of roots`, 
	function() {
		const N = 1000;
		const orders = [3,7,19];
		const near = 1;
		const spacing = 1/100;
		
		
		// Get odd polynomial with multiple roots near 1
		let seed = 11111;
		for (let j=0; j<orders.length; j++) {
			let ps = [];
			//let fs = [];
			for (let i=0; i<N; i++) {
				let arr = flatCoefficients(orders[j], 0, 1, seed);
				let froots = arr.p.map(x => (x*spacing) + near);
				seed  = arr.seed;

				ps.push(fromRoots(froots));
				//fs.push(froots);
			}
			
			for (let i=0; i<ps.length; i++) {
				let p = ps[i];
				let roots = allRoots(p);
				//console.log(roots, fs[i])
				assert(roots.length >= 1);
				assert(rootsAccurateEnough(p,roots), 'Roots not correct');
			}
		}
	});
	
	
	it(`should not miss a triple or higher odd degree root for hundreds
		of predictable random polynomials`, 
	function() {
		const N = 1000;
		const orders = [3,7,19];
	
		
		// Get odd polynomial with multiple roots near 1
		let seed = 11111;
		for (let j=0; j<orders.length; j++) {
			let ps = [];
			//let fs = [];
			for (let i=0; i<N; i++) {
				// This is just to get a single predictable random value
				let arr = flatCoefficients(1, -1, 1, seed);
				let v = arr.p[0];
				seed = arr.seed;
				
				let froots = new Array(orders[j]).fill(v); 
				//console.log(froots);

				ps.push(fromRoots(froots));
				//fs.push(froots);
			}
			
			for (let i=0; i<ps.length; i++) {
				let p = ps[i];
				let roots = allRoots(p);
				//console.log(roots[0], fs[i][0])
				//console.log(roots[0])
				assert(roots.length >= 1);
				assert(rootsAccurateEnough(p,roots), 'Roots not correct');
			}
		}
	});
});












