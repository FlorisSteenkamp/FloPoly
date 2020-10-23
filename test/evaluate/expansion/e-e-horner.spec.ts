
import { assert, expect } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { eEstimate, twoSum, eSum } from 'big-float-ts';
import { 
	eeHorner, compHorner, compHornerIsFaithful, Horner, 
    CompHornerK, conditionNumber, compHornerWithRunningError,
    EFTHorner, eHorner, evalCertified, evalCertifiedInclError,
    evalK, multiply
} from '../../../src/index'
import { transposePoly } from '../../../src/roots/certified/transpose-poly';


/*
 * Philippe Langlois, Nicolas Louvet. Faithful Polynomial Evaluation with Compensated Horner Algorithm.
 * ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier,
 * France. pp.141–149. hal-00107222
 */


describe('eeHorner', function() {
    it(`should evaluate some polynomials correctly and accurately or exactly`,

    // NOTE: this function tests several functions simultaneously:
    // eeHorner
    // compHorner
    // compHornerIsFaithful
    // Horner, 
    // CompHornerK 
    // compHornerWithRunningError
    // EFTHorner
    // evalCertified
    // evalCertifiedInclError
    // evalK

	function() {
        // some polynomial
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
        
        // map to Shewchuk expansion
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

		// one particular root (stupid accurate): 
		let root1 = [
			-5.019612107472268e-68, // this double 'may' contain wrong bits
			1.1115071913595584e-51,
			2.3113966677819994e-35,
			1.7061597212759286e-18,
			0.4183749565854647
		];


        // we evaluate very close to a root so that p(x) has a very high 
        // condition number
        let c = 0.4183749565854647;
		let cn = conditionNumber(p_, c);
        let unfaithfulHorner = compHornerIsFaithful(p_, c);
        
        /*
        console.log('Condition number ', cn);  //=> 92143441590866480000
		console.log('Horner ', Horner(p_, c)); //=> 1.0408340855860843e-17
		console.log('compHorner ', compHorner(p_, c)); //=> -6.6865131963207694e-21
		console.log('faithful ', faith); //=> { isFaithful: false, errBound: 2.785314415593918e-32, 'r̄': -6.6865131963207694e-21 }
		console.log('compHornerK ', CompHornerK(p_, c, 2));  //=> -6.6865131963200306e-21
        console.log('exact to last ulp', eEstimate(eeHorner(p, [c])));  //=> -6.686513196320162e-21
        console.log('exact as Shewchuk', eeHorner(p, [c]));  
        //=> [
        //    8.091831733644689e-136,
        //    2.094485622400387e-119,
        //    4.1470589674758764e-103,
        //    6.339350558917045e-86,
        //    -8.882292182346106e-70,
        //    1.4836824602749686e-67,
        //    -1.7723127766360825e-51,
        //    -1.9112575623823073e-37,
        //    -6.686513196320162e-21
        // ]
        */


        // expect an extremely high condition number
        expect(cn).above(90_000_000_000_000_000_000);
        
        let exactValue = -6.686513196320162e-21;  // up to one ulps only obviously
        let Horner_ = Horner(p_, c);
        let HornerRelativeError = Math.abs((exactValue - Horner_) / exactValue);  //=> 1557.61711123055
        // expect Horner to not be accurate - all bits including sign bit is wrong
        assert(HornerRelativeError > 10);

        let compHorner_ = compHorner(p_, c);
        let compHornerRelativeError = Math.abs((exactValue - compHorner_) / exactValue); //=> 9.079759577036585e-14
        // expect compHorner to be several trillion times more acccurate
        assert(HornerRelativeError / compHornerRelativeError > 1e12);

        // don't expect this evaluation to be faithful
        expect(unfaithfulHorner).to.eql({ 
            isFaithful: false, 
            errBound: 2.785314415593918e-32, 
            'r̄': -6.6865131963207694e-21 
        });


        let faithfulHorner = compHornerIsFaithful(p_, c * 1.00001);
        // expect an evaluation slightly away from the root to be very likely faithful
        assert(faithfulHorner.isFaithful);

        expect(compHornerWithRunningError(p_, c)).to.eql( [
            -6.6865131963207694e-21,  // result
            2.785314415593911e-32     // error bound - thus not faithful in this case
        ]);


        let compHornerK_ = CompHornerK(p_, c, 2);
        let compHornerKRelativeError = Math.abs((exactValue - compHornerK_) / exactValue); //=> 1.9689689293449847e-14
        // expect compHornerK to be several trillion times more acccurate (similiar to compHorner)
        assert(HornerRelativeError / compHornerKRelativeError > 1e12);

        // exact to last ulp
        expect(eEstimate(eeHorner(p, [c]))).to.eql(exactValue);

        // totally exact as a Shewchuk expansion
        expect(eeHorner(p, [c])).to.eql([
            8.091831733644689e-136,
            2.094485622400387e-119,
            4.1470589674758764e-103,
            6.339350558917045e-86,
            -8.882292182346106e-70,
            1.4836824602749686e-67,
            -1.7723127766360825e-51,
            -1.9112575623823073e-37,
            -6.686513196320162e-21
        ]);

        // the error free transformation should be... error free
        let { r̂, pπ, pσ } = EFTHorner(p_, c);
        let rπ = eHorner(pπ.map(c => [c]), c);
        let rσ = eHorner(pσ.map(c => [c]), c);
        let r = eEstimate(eSum([[r̂ ], rπ, rσ]));
        expect(r).to.eql(exactValue);

        // map to double-double precision 
        let ddP = p_.map(x => twoSum(x*2**-50,x));
        // with some error polynomial
        let pE = p_.map(x => Math.abs(x*2**-49));

        let ddP_ = transposePoly(ddP);

        // we are too close to the root to decide the sign
        let certA = evalCertified(ddP_, c, pE);
        assert(certA === 0);

        // we are not too close to the root to decide the sign
        let certB = evalCertified(ddP_, c+0.00001, pE);
        assert(certB !== 0);


        // we are too close to the root to decide the sign
        let certEA = evalCertifiedInclError(ddP_, c, pE);
        let certEA_ = evalCertified(ddP_, c, pE);
        expect(certEA).to.eql({ r̂: 0, e: 1.0944460238556618e-15 });
        expect(certEA_).to.eql(certEA.r̂);

        // we are not too close to the root to decide the sign
        let certEB = evalCertifiedInclError(ddP_, c+0.00001, pE);
        let certEB_ = evalCertified(ddP_, c+0.00001, pE);
        expect(certEB).to.eql({ r̂: 3.9180861780702125e-8, e: 1.3056137644801344e-15 });
        expect(certEB_).to.eql(certEB.r̂);

        {
            // pE needs to be reduced a bit for this test
            let pE = p_.map(x => Math.abs(x*2**-80));
            
            // we are too close to the root to decide the value to within some multiple of the error
            let certEC = evalCertifiedInclError(ddP_, c+0.000000000001, pE, 64);
            let certEC_ = evalCertified(ddP_, c+0.000000000001, pE, 64);
            expect(certEC).to.eql({ r̂: 3.9189495492975434e-15, e: 5.09641621577133e-25 });
            expect(certEC_).to.eql(certEC.r̂);
        }


        // no error polynomial => assumed zero polynomial
        let certED = evalCertifiedInclError(ddP_, c);
        let certED_ = evalCertified(ddP_, c);
        expect(certED).to.eql({ r̂: -6.6865131963207694e-21, e: 3.212160411083628e-32 });
        expect(certED_).to.eql(certED.r̂);


        // ----------------
        // evalK
        // ----------------

        let evalK_A = evalK(p_, c);
        // expect the result to be quite close to the exact result
        // this is the K2 path
        expect(evalK_A).to.eql(-6.6865131963207694e-21);

        let evalK_B = evalK(p_, c + 0.000001);
        // this is the K1 path
        expect(evalK_B).to.eql(3.918947256986716e-9);
        

        // below is how p_2 was created - triple root at 1835, single at 1000 and 1834
        //let p_2 = multiply(
        //    multiply(
        //        multiply([1,-1835],[1,-1834]),
        //        multiply([1,-1835],[1,-1835])
        //    ),
        //    [1,-1000]
        //);
        // this polynomial has a really high condition number close to 1835
        let p_2 = [
			1,
            -8339,
            27536845,
            -44903174825,
            36037355167750,
            -11332025342750000
        ];

        let c2 = 1834.999999999992;
        let cn2 = conditionNumber(p_2, c2);
        //console.log(cn)  // => about 10^48


        let evalK_C = evalK(p_2, c2);
        // this is the K4 path, i.e. double-double-double-double precision
        expect(evalK_C).to.eql(-4.208343244307185e-31);
	});
});


