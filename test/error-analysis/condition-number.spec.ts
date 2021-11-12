
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { conditionNumber } from '../../src/index.js';


describe('conditionNumber', function() {
	it('should correctly calculate the condition number for some polynomials at some points', 
	function() {
		let p1 = [
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

		// p1 has roots at roughly (where the condition number should be high):
		// 	0.3361742829036019, 
		// 	0.6260997031130033 and 
		// 	1.325558242403445 <- this is actually the best floating point approx. of the root

		// get condition number estimates at some points
		let c1 = conditionNumber(p1, 1.5);  // should be lowish
		let c2 = conditionNumber(p1, 1000_000_000);  // should be low
		let c3 = conditionNumber(p1, -1000_000_000);  // should be low
		let c4 = conditionNumber(p1, 0.33);  // should be pretty high ~ 10**3
		let c5 = conditionNumber(p1, 0.62609);  // should be very high ~ 10**5
		let c6 = conditionNumber(p1, 1.325558242403445);  // should be extremely high ~ 2**53
		
		//console.log(c6)

 		expect(c1).to.be.lessThan(250);             // => 144.87661476947537
		expect(c2).to.be.lessThan(2);               // => 1.0000000061581567
		expect(c3).to.be.lessThan(2);               // => 0.9999999938418433
		expect(c4).to.be.above(1000);               // => 3568.2756890558076
		expect(c5).to.be.above(1000_000);           // => 20246637.631723296
		expect(c6).to.be.above(1000_000_000_000);   // => 314905786802669100
	});
});
