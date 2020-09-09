
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { allRootsCertified, RootInterval, allRoots } from '../../../src/index';
import { twoSum } from 'big-float-ts';


describe('allRootsCertified - find all roots within an interval of a polynomial with multi-precision coefficients such that all roots are guaranteed to be captured in some interval', 
function() {
	it('should not return roots for the zero or a constant polynomial', 
	function() {
		let p1: number[][] = [];
		let p2 = [[3]];		
		let roots1 = allRootsCertified(p1);
		let roots2 = allRootsCertified(p2);
		assert(roots1.length === 0);
		assert(roots2.length === 0);
	});
	it('should find roots correctly of basic polynomials (with infinite range)',
	function() {
		{
			// p = x^2
			const  { p, pE, getPExact } = makePoly([1,0,0]);
			const ts = allRootsCertified(p, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, pE, getPExact);
			
			// double root at 0
			assert(isThereRootAt(0, 2, ts));
		}
		{
			// p = x^2 - 1
			const  { p, pE, getPExact } = makePoly([1,0,-1]);
			const ts = allRootsCertified(p, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, pE, getPExact);

			// simple root at -1 and +1
			assert(isThereRootAt(-1, 1, ts));
			assert(isThereRootAt(+1, 1, ts));
		}
	});


	it('should find roots correctly of some polynomials (withing some range [-50,100])',
	function() {
		{
			// coefficients in double-double precision
			let p = [
				[ 0.1580350755837278, 3770986809251668.5 ],
				[ -0.437621888289444, -11611163849314706 ],
				[ 0.37925906415346655, 13622867559528270 ],
				[ -0.18215364304839451, -6015675011409949 ],
				[ -0.2113068076998193, -2535765899677980.5 ],
				[ -0.03234301695064162, 1004670324427690 ],
				[ -0.13228935570003014, 5119556864733271 ],
				[ 0.46839905715354696, -5283583821747902 ],
				[ -0.0020342528097285484, 1955103350624411 ],
				[ -0.004629837980953938, -252827841312240.88 ]
			];

			// coefficients in double precision
			let pD = [
				3770986809251668.5,
				-11611163849314706,
				13622867559528270,
				-6015675011409949,
				-2535765899677980.5,
				1004670324427690,
				5119556864733271,
				-5283583821747902,
				1955103350624411,
				-252827841312240.88
			];

			// coefficient-wise error bound of double-double precision 
			// coefficients
			let pE = [
				5.973763369817942e-16,
				3.154260190691488e-15,
				1.0432584785199789e-14,
				2.0265321429548282e-14,
				3.236053769569458e-14,
				3.1173345325629133e-14,
				2.228376621708172e-14,
				1.2374462883419778e-14,
				3.82255386973334e-15,
				5.160968273258298e-16
			];

			//getPExact - not specified

			let lb = -50;
			let ub = 100;
			const ts = allRootsCertified(p, lb, ub, pE, undefined);
			
			// roots:
			// [
			// 	{ tS: 0.3361742829036018, tE: 0.336174282903602, multiplicity: 1 },
			// 	{ tS: 0.6260997031130031, tE: 0.6260997031130033, multiplicity: 1 },
			// 	{ tS: 1.3255582424034447, tE: 1.3255582424034453, multiplicity: 1 }
			// ]

			assert(isThereRootAt(0.3361742829036019, 1, ts));
			assert(isThereRootAt(0.6260997031130032, 1, ts));
			assert(isThereRootAt(1.3255582424034449, 1, ts));

			//const tsf = allRoots(pD, lb, ub);
		}
	});
});


function isThereRootAt(
		t: number, multiplicity: number, roots: RootInterval[]) {

	for (let r of roots) {
		if (
			r.tS <= t && 
			r.tE >= t && 
			r.tE - r.tS <= 4 * Number.EPSILON &&
			r.multiplicity === multiplicity) {

			return true;
		}
	}

	return false;
}


// make a double-double coefficient polynomial from the given double precision
// input polynomial - perturbs the polynomial a bit
function makePoly(pp: number[]) {
	// a perturbation factor
	let d = 2**3*Number.EPSILON;

	// make double-double poly
	const p = pp.map(c => twoSum(d*c, c));

	// same poly but exact
	const pExact = pp.map(c => [0, c]);

	let getPExact = () => pExact;

	// coeffientwise error bound of the input poly
	const pE = pp.map(c => Math.abs(d*c));
	

	return { p, pE, getPExact };
}
