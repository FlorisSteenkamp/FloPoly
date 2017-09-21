
let expect = chai.expect;
let assert = chai.assert;

let { evaluate, allRoots, hornerErrorBound } = FloPoly;
let { flatRootsArr } = FloPoly.random;

/**
 * Tests if a root of p is close enough to x to be considered valid.
 */
function rootAccurateEnough(p, x) {
	let v = Math.abs(evaluate(p,x)); 
	let e = hornerErrorBound(p,x);
	
	//console.log(e/v, v);
	return e-v >= 0;
}

/**
 * Tests if all roots of p is close enough to x to be considered valid.
 */
function rootsAccurateEnough(p, roots) {
	for (let i=0; i<roots.length; i++) {
		if (!rootAccurateEnough(p, roots[i])) {
			return false;
		}		
	}
	
	return true;
}

describe('allRoots', function() {
	it('should calculate some quadratic roots correctly', function() {
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
	
	it('should calculate some cubic roots accurately', function() {
		let p;
		let roots;
		
		p = [1, 0.7, -0.28, 0.02];
		roots = allRoots(p);
		assert(rootsAccurateEnough(p,[-1, 0.1, 0.2]), 'Roots not correct');
	});
	
	it('should calculate the roots correctly for some polynomials that have only real roots', function() {
		const orders = [3,4,7,12,15];
		let pss = [
			flatRootsArr(10, orders[0], -10, 10, 11111),
			flatRootsArr(10, orders[1], -10, 10, 22222),
			flatRootsArr(10, orders[2], -10, 10, 33333),
			flatRootsArr(10, orders[3], -10, 10, 44444),
			flatRootsArr(10, orders[4], -10, 10, 55555),
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
});












