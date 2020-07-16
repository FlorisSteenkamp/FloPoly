
import { assert, expect } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { evaluateExact } from '../../src/evaluate/evaluate-exact';
import { eEstimate, twoSum } from 'big-float-ts';
import { SumK } from '../../src/evaluate/sum-k'
import { compHorner } from '../../src/evaluate/comp-horner'
import { compHornerIsFaithful } from '../../src/evaluate/comp-horner-is-faithful'
import { Horner } from '../../src/evaluate/horner'
import { CompHornerK } from '../../src/evaluate/comp-horner-k'
import { conditionNumber } from '../../src/error-analysis/condition-number';


describe('evluatePrecise', function() {
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

        // roots accurate to 1 ulps: 
        // -0.26668459083884954,
        // -0.19912344124168158,
        // 0.4183749565854647,
        // 0.4686555275693587,
        // 0.789976061321727,
        // 1.0090627083558543,
        // 1.2372617134802784,
        // 1.2845610985552014,
        // 1.6018132576717898

		// one root (stupid accurate): 
		let root1 = [
			-5.019612107472268e-68, // this double may contain wrong bits
			1.1115071913595584e-51,
			2.3113966677819994e-35,
			1.7061597212759286e-18,
			0.4183749565854647
		];


        // we evaluate very close to a root so that p(x) has a very high 
        // condition number

        // see 
        let c = 0.4183749565854647;
		let cn = conditionNumber(p_, c);
		let faith = compHornerIsFaithful(p_, c);
        console.log('Condition number ', cn);
		console.log('Horner ', Horner(p_, c));
		console.log('compHorner ', compHorner(p_, c));
		console.log('faithful ', faith);
		console.log('compHornerK ', CompHornerK(p_, c, 2));
		console.log('exact', eEstimate(evaluateExact(p, [c])));



		//console.log('--------------');
		//
		//let vs = [
			////-5.0986992405910314e-14,
			//-5.098699240591032e-14, // === -5.0986992405910314e-14 - 1 ulps
			//+1234.0080688973223,
			//-1234.21923492034,
			//+0.2319277001182,
			//+1234.109083420923,
			//-1234.1298450980235
		//]; // fl(vs[0] + vs[1] + vs[2] + vs[3]) = -0.000009803100816441201
		// 1234.0080688973223 - 1234.21923492034 + 0.2319277001182 + 1234.109083420923 - 1234.1298450980235
		//let v = SumK(vs, 4);
		//console.log('naive sum', vs.reduce((prev, v) => prev + v, 0));
		//console.log('SumK', v)
				  
		//let roots = allRootsPrecise(p,[0],[1]);
		//console.log(roots);
		
		//console.log(roots.map(eEstimate));
	});
});


/*
 * Philippe Langlois, Nicolas Louvet. Faithful Polynomial Evaluation with Compensated Horner Algorithm.
 * ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier,
 * France. pp.141–149. hal-00107222
 */