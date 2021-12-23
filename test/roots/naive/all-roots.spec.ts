import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { 
	allRoots, fromRoots, flatRootsArr, 
	flatCoefficientsArr, flatCoefficients, Horner, hornerWithRunningError, 
	toCasStr, multiply
} from '../../../src/index.js';
import { rootAccurateEnough } from '../../helpers/root-accurate-enough.js';


const negInf = Number.NEGATIVE_INFINITY;
const posInf = Number.POSITIVE_INFINITY;
const abs = Math.abs;


describe('allRoots', function() {
	it('should not return the correct roots by removing trailing zeros (i.e. zero roots)', 
	function() {
		let p: number[] = [0,-9,5,0];
		let roots = allRoots(p);
		assert(roots.length === 2);
		expect(roots[0]).to.eql(0);
		expect(roots[1]).to.eql(5/9);
	});

	it('should not return the correct roots by removing leading zeros', 
	function() {
		let p: number[] = [0,-9,5];
		let roots = allRoots(p);
		assert(roots.length === 1);
		expect(roots[0]).to.eql(5/9);
	});

	
	it('should not return roots for the zero or a constant polynomial', 
	function() {
		let p1: number[] = [];
		let p2 = [3];		
		let roots1 = allRoots(p1);
		let roots2 = allRoots(p2);
		assert(roots1.length === 0);
		assert(roots2.length === 0);
	});


	it('should return sorted roots when there are roots at zero',
	function() {
		// roots at -1, 1
		let p: number[] = multiply([1,1], [1,-1]);
		// add 3 more at 0
		p.push(0,0,0);

		let roots = allRoots(p);
		
		expect(roots).to.eql([-1,0,0,0,1]);
	});


	it('should return roots correctly if a root is very close to the lower bound',
	function() {
		// roots at -1, 1
		let p: number[] = multiply([1,-1.07], [1,-1.000000000000001]);
		// add 2 more at 0
		p.push(0,0);

		let roots = allRoots(p,1,5);
		
		//console.log(roots);
		//console.log(toCasStr(p));
		expect(roots).to.eql([1, 1.0700000000000023]);
	});


	it('should return roots correctly if a root is very close to the upper bound',
	function() {
		// roots at -1, 1
		let p: number[] = multiply([1,-1.07], [1,-1.000000000000001]);
		// add 2 more at 0
		p.push(0,0);

		let roots = allRoots(p,-5,1);
		
		//console.log(roots);
		//console.log(toCasStr(p));
		expect(roots).to.eql([0, 0, 1]);
	});


	it('should only return roots in the given left half-open range', 
	function() {
		let p = [1, 0.7, -0.28, 0.02];
		// roots at -1, 0.1, 0.2
		let roots = allRoots(p, negInf, 0);
		assert(
			roots.length === 1 &&
			numsWithin(roots, negInf, 0), 
			'Roots not correct - roots: [' + roots + '] - should be [-1]'
		);
	});
	
	
	it('should only return roots in the given right half-open range', 
	function() {
		let p = [1, 0.7, -0.28, 0.02];
		// roots at -1, 0.1, 0.2
		let roots = allRoots(p, 0, posInf);
		assert(
			roots.length === 2 &&
			numsWithin(roots, 0, posInf), 
			'Roots not correct - roots: [' + roots + '] - should be [0.1,0.2]'
		);
	});
	
	it('should not return roots that doesn\'t fall in the given closed range', 
	function() {
		let p = [1, 0.7, -0.28, 0.02];
		// roots at -1, 0.1, 0.2
		let roots = allRoots(p,0,2);
		assert(
			roots.length === 2 &&
			numsWithin(roots, 0, 2), 
			'Roots not correct - roots: [' + roots + '] - should be [0.1, 0.2]'
		);
	});
	
	it('should return no roots for a zero polynomial', 
	function() {
		let p: number[] = [];
		let roots = allRoots(p);
		expect(roots).to.be.an('array').that.is.empty;
	});
	
	it('should return no roots for a non-zero constant polynomial', 
	function() {
		let p = [2.2];
		let roots = allRoots(p);
		expect(roots).to.be.an('array').that.is.empty;
	});
	
	it('should calculate some simple linear polynomial roots accurately', 
	function() {
		let p = [0.1,2.2];
		let roots = allRoots(p);
		assert(
			rootsAccurateEnough(p,[-22]), 
			'Roots not correct (1)'
		);
	});
	
	it('should calculate some simple quadratic roots accurately', 
	function() {
		{
			let p = [1,-3,2];
			let roots = allRoots(p);
			assert(roots[0] === 1);
			assert(roots[1] === 2);
		}
		
		{
			let p = [1, -1.1, 0.3];
			let roots = allRoots(p);

			assert(roots[0] === 0.49999999999999944);
			assert(roots[1] === 0.6000000000000005);
		}
	});
	
	it('should calculate some simple cubic roots accurately', 
	function() {
		let p = [1, 0.7, -0.28, 0.02];
		let roots = allRoots(p);
		assert(
			roots.length === 3,
			`Root count wrong (2); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
		);
		assert(
			//rootsAccurateEnough(p,[-1, 0.1, 0.2]), 
			rootsAccurateEnough(p,roots),
			`Roots not correct (2); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
		);
	});
	
	it(
	`should calculate the roots correctly for hundreds of polynomials each
	with reproducable random roots (in a flat distribution from -10 to 
	10) of order 3,4,7,12,15, and 20 that only have real roots`, 
	function() {
		this.timeout(5000);
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

				assert.equal(
					p.length-1, orders[i],
					`Root count wrong (3); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
				);
				let rootsAccurateEnough_ = rootsAccurateEnough(p,roots);
				assert(
					rootsAccurateEnough_, 
					`Roots not correct (3); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
				);
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
				assert(
					rootsAccurateEnough(p,roots), 
					`Roots not correct (4); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
				);
			}
		}
	});
	
	
	it(`should not miss a near triple or higher odd degree root for hundreds
		of predictable random polynomials designed to have these kinds of roots`, 
	function() {
		this.timeout(10000);
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
				assert(
					roots.length >= 1,
					`Root count wrong (5); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
				);
				assert(
					rootsAccurateEnough(p,roots), 
					`Roots not correct (5); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
				);
			}
		}
	});
	
	
	it(`should not miss a triple or higher odd degree root for hundreds
		of predictable random polynomials`, 
	function() {
		this.timeout(10000);
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
				assert(
					roots.length >= 1,
					`Root count wrong (6); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
				);
				assert(
					rootsAccurateEnough(p,roots), 
					`Roots not correct (6); p: [${p}], p: ${toCasStr(p)}, roots: [${roots}]`
				);
			}
		}
	});
});


/**
 * Helper function. Tests if all roots of p is close enough to x to be 
 * considered valid.
 */
function rootsAccurateEnough(p: number[], roots: number[]) {
	for (let i=0; i<roots.length; i++) {
		if (!rootAccurateEnough(p, roots[i])) {
			return false;
		}		
	}
	
	return true;
}


/**
 * Helper function. Tests if an array of numbers are all within the 
 * range [a,b] 
 */
function numsWithin(ns: number[], a: number, b: number) {
	for (let n of ns) {
		if (n < a || n > b) {
			return false;
		}
	}

	return true;
}









