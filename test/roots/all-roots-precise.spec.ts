/*
import { assert, expect } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { numsWithin } from '../helpers/nums-within';
import { 
	allRootsPrecise, fromRoots, flatRootsArr, flatCoefficientsArr, 
	flatCoefficients, hornerErrorBound, allRoots
} from '../../src/index';
import { evaluateExact } from '../../src/core-operators/evaluate/evaluate-exact';
import { estimate, expansionProduct, fastExpansionSum } from 'big-float-ts';
import { fromRootsPrecise } from '../../src/from-roots';
import { compHorner } from '../../src/core-operators/evaluate/evaluate-precise';
import { Horner } from '../../src/core-operators/evaluate/evaluate';
*/

describe('allRootsPrecise', function() {
    //let A = [-1000]
	//let B = [+1000];
	let A = [0]
    let B = [1];

	/*
	it('should calculate some simple linear polynomial roots accurately', 
	function() {
		let p = [[0.1],[2.2]];
        let roots = allRootsPrecise(p,[-50],[50]);
		assert(
			rootsAccurateEnough(p,roots),
			'Roots not correct'
        );
    });
    
	it('should calculate some simple quadratic roots accurately', 
	function() {
		{
            let p = [[1],[-3],[2]]; // roots at 1,2
            let approxRoots = allRoots(p.map(estimate),estimate(A),estimate(B));
            //console.log(approxRoots);
            let roots = allRootsPrecise(p,[-50],[50]);
            //console.log('roots ', roots);
			expect(roots.map(estimate)).to.eql([
				1, 2
			]);
		}

		{
			let p = [[1], [-1.1], [0.3]];
			let roots = allRootsPrecise(p,A,B);
			//expect(roots.map(estimate)).to.eql([
			//	0.5, 0.6 // <- actually === 0.49999999999999944, 0.6000000000000006 due to coefficients: fl(0.3) !== 0.3
			//]);
			assert(
				rootsAccurateEnough(p,roots),
				'Roots not correct'
			);
			//console.log(roots);
        }

	});
	
	it('should calculate some simple cubic roots accurately', 
	function() {
		let p = [1, 0.7, -0.28, 0.02].map(x => [x]);
		let roots = allRootsPrecise(p,A,B);
		assert(
			rootsAccurateEnough(p,[-1, 0.1, 0.2].map(x => [x])), 
			'Roots not correct'
		);
	});
	*/
	/*
	it(
	`should calculate the roots correctly for hundreds of polynomials each
	with reproducable random roots (in a flat distribution from -10 to 
	10) of order 3,4 and 9 that only have real roots`, 
	function() {
		const N = 10;
		const orders = [3,4,9];
		let pss = [
			flatRootsArr(N, orders[0], -10, 10, 11111),
			flatRootsArr(N, orders[1], -10, 10, 22222),
			flatRootsArr(N, orders[2], -10, 10, 33333)
		];

		let k = 0;
		for (let i=0; i<pss.length; i++) {
			for (let j=0; j<pss[i].length; j++) {
				k++;
				let p = pss[i][j];
				//console.log(p)
				let roots = allRootsPrecise(p.map(x => [x]),A,B);
				
				assert.equal(p.length-1, orders[i]);
				assert(rootsAccurateEnough(p.map(x => [x]),roots), 'Roots not correct');
			}
		}
		//console.log(k)
	});
	*/
	/*
	it(`should calculate the roots correctly for many polynomials each
		with reproducable random coefficients (in a flat distribution from -10 to 
		10) of order 3,4 and 9`, 
	function() {
		const N = 10;
		const orders = [3,4,9];
		let pss = [
			flatCoefficientsArr(N, orders[0], -10, 10, 11111),
			flatCoefficientsArr(N, orders[1], -10, 10, 22222),
			flatCoefficientsArr(N, orders[2], -10, 10, 33333)
		];
		
		for (let i=0; i<pss.length; i++) {
			for (let j=0; j<pss[i].length; j++) {
				let p = pss[i][j];
				let roots = allRootsPrecise(p.map(x => [x]),A,B);
				
				//assert.equal(p.length-1, orders[i]);
				assert(rootsAccurateEnough(p.map(x => [x]),roots), 'Roots not correct');
			}
		}
	});
	
	
	it(`should not miss a near triple or higher odd degree root for hundreds
		of predictable random polynomials designed to have these kinds of roots`, 
	function() {
		const N = 10;
		const orders = [3,7,9];
		const near = 0.4;
		const spacing = 1/100;
		
		
		// Get odd polynomial with multiple roots near 0.4
		let seed = 11111;
		for (let j=0; j<orders.length; j++) {
			let ps: number[][] = [];
			for (let i=0; i<N; i++) {
				let arr = flatCoefficients(orders[j], 0, 1, seed);
				let froots = arr.p.map(x => (x*spacing) + near);
				seed  = arr.seed;

				ps.push(fromRoots(froots));
				//console.log(froots);
			}
			
			for (let i=0; i<ps.length; i++) {
				let p = ps[i];
				let roots = allRootsPrecise(p.map(x => [x]),A,B);
				//console.log(roots)
				assert(roots.length >= 1);
				assert(rootsAccurateEnough(p.map(x => [x]),roots), 'Roots not correct');
			}
		}
	});
	*/
	/*
	it(`should not miss a triple or higher odd degree root for lots of of 
		predictable random polynomials`, 
	function() {
		const N = 5;
		const orders = [3,7,9];
	
		/*
		let froots = new Array(7).fill(0.7873781323432922);
		console.log(froots[0]);
		let p = fromRootsPrecise(froots);
		//let p_ = fromRoots(froots).map(x => [x]);
		console.log(p);
		//console.log(p_);
		let roots = allRootsPrecise(p,A,B);
		//console.log(roots[0], fs[i][0])
		console.log(roots.map(estimate))
		assert(roots.length >= 1);
		assert(rootsAccurateEnough(p,roots), 'Roots not correct');
		

		// Get odd polynomial with multiple roots near 1
		let seed = 11111;
		for (let j=0; j<orders.length; j++) {
			for (let i=0; i<N; i++) {
				// This is just to get a single predictable random value
				let arr = flatCoefficients(1, 0, 1, seed);
				let v = arr.p[0];
				seed = arr.seed;
				
				let froots = new Array(orders[j]).fill(v); 
				console.log('=======================');
				console.log(froots[0]);

				let p = fromRootsPrecise(froots);
				let roots = allRootsPrecise(p,A,B);
				console.log(roots.map(estimate))
				//console.log(p);
				assert(roots.length >= 1);
				assert(rootsAccurateEnough(p,roots), 'Roots not correct');
			}
		}
	});*/
	/*
	it(`should not miss a close triple or higher odd degree root for lots of of 
		predictable random polynomials`, 
	function() {
		const N = 1;
		const orders = [9];
	
		// Get odd polynomial with multiple roots near 1
		let seed = 11111;
		for (let j=0; j<orders.length; j++) {
			for (let i=0; i<N; i++) {
				// This is just to get a single predictable random value
				let arr = flatCoefficients(orders[j]+1, 0, 1, seed);
				let v = arr.p[0];
				let bys = arr.p.slice(1);
				seed = arr.seed;
				
				let froots: number[] = new Array(orders[j]).fill(v);
				froots = froots.map((x,i) => perturb(x,bys[i]));
				console.log('=======================');
				console.log(froots);

				let p = fromRootsPrecise(froots);
				let roots = allRootsPrecise(p,A,B);
				console.log(roots.map(estimate))
				//console.log(p);

				assert(roots.length >= 1);
				assert(rootsAccurateEnough(p,roots), 'Roots not correct');
			}
		}
	});*/
	/*
	it(`should`, 
	function() {
		const N = 1;
		const orders = [9];
	
		// Get odd polynomial with multiple roots near 1
		let seed = 11111;
		for (let j=0; j<orders.length; j++) {
			for (let i=0; i<N; i++) {
				// This is just to get a single predictable random value
				let arr = flatCoefficients(orders[j]+1, 0, 1, seed);
				let v = arr.p[0];
				let bys = arr.p.slice(1);
				seed = arr.seed;
				
				let froots: number[] = new Array(orders[j]).fill(v);
				froots = froots.map((x,i) => perturb(x,bys[i]));
				console.log('=======================');
				console.log(froots);
				console.log('-----------------------');

				let p = fromRootsPrecise(froots);
				console.log(p.map(x => x[x.length-1]));
				console.log('-----------------------');
				let roots = allRootsPrecise(p,A,B);
				console.log(roots.map(estimate))
				console.log('-----------------------');
				//console.log(p);

				assert(roots.length >= 1);
				assert(rootsAccurateEnough(p,roots), 'Roots not correct');
			}
		}
	});*/

	it(`should`, 
	function() {
		let p_ = [
			1,
			-6.343897291459143,
			16.17529860902309,
			-20.775430184046723,
			13.267259045095072,
			-2.680435184002393,
			-1.193961620590383,
			0.5676824443276621,
			0.004650511478518739,
			-0.021130026752576234
		];
		let p = p_.map(x => [x]);

		// roots (accurate to 1 ulps): [ 0.4183749565854647, 0.4686555275693587, 0.789976061321727 ]

		// one root (stupid accurate): 
		let root1 = [
			-5.019612107472268e-68, // this double may contain insignificant bits
			1.1115071913595584e-51,
			2.3113966677819994e-35,
			1.7061597212759286e-18,
			0.4183749565854647
		];

		
		// Here p and p_ are numerically equal
		/*
		console.log('Horner ', Horner(p_, 0.4183749565854647));
		console.log('compHorner ', compHorner(p_, 0.4183749565854647));
		console.log('exact order 1 ', estimate(evaluateExact(p, [0.4183749565854647])));
		console.log('exact order 5 ', estimate(evaluateExact(p, root1)));
		*/

		/*
		let c = 0.4183749565854647;
		console.log('Horner ', Horner(p_, c));
		console.log('compHorner ', compHorner(p_, c));
		console.log('exact', estimate(evaluateExact(p, [c])));
				  
		let roots = allRootsPrecise(p,[-5],[5]);
		//console.log(roots);
		*/

		//console.log(roots.map(estimate));
	});
});


/*
function perturb(x: number, by: number) {
	let delta = (by-0.5)*2;
	return x + delta;
}


/**
 * Helper function. Tests if a root of p is close enough to x to be 
 * considered valid.
 *//*
function rootAccurateEnough(p: number[][], x: number[]) {
	let v = Math.abs(estimate(evaluateExact(p,x))); 
	let e = hornerErrorBound(p.map(estimate), estimate(x));
	
	//console.log(e/v, v, e-v);
	return e-v >= 0;
}


/**
 * Helper function. Tests if all roots of p is close enough to x to be 
 * considered valid.
 *//*
function rootsAccurateEnough(p: number[][], roots: number[][]) {
	for (let i=0; i<roots.length; i++) {
		if (!rootAccurateEnough(p, roots[i])) {
			return false;
		}		
	}
	
	return true;
}
*/