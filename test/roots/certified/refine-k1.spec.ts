
import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { allRootsCertified, refineK1, eHorner, eeHorner } from '../../../src/index';
import { eEstimate } from 'big-float-ts';


describe('refineK1 - refine a given root bracket - typically to roughly double-double precision',
function() {
	it('should refine some root brackets of some polynomial(s) correctly',
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

			// coefficientwise error bound of double-double precision 
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

			let lb = -50;
			let ub = 100;
            const ts = allRootsCertified(p, lb, ub, pE, undefined);
            
            // ts should be around:
            // [
            //     { tS: 0.3361742829036018, tE: 0.336174282903602, multiplicity: 1 },
            //     { tS: 0.6260997031130031, tE: 0.6260997031130033, multiplicity: 1 },
            //     { tS: 1.3255582424034447, tE: 1.3255582424034453, multiplicity: 1 }
            // ]

            let t0_ = (ts[0].tS + ts[0].tE) / 2;
            let t0 = refineK1(ts[0], p);
            
            // ts0 should be around:
            // [{
            //     tS: [ -1.981540274258879e-17, 0.3361742829036019 ],
            //     tE: [ -1.981540274258874e-17, 0.3361742829036019 ],
            //     multiplicity: 1
            // }]
            //
            // with original bracket width = 2.220446049250313e-16 = eps

            let t1_ = (ts[1].tS + ts[1].tE) / 2;
            let t1 = refineK1(ts[1], p);

            // ts1 should be around:
            // [{
            //     tS: [ -1.8639464158577974e-17, 0.6260997031130033 ],
            //     tE: [ -1.8639464158577925e-17, 0.6260997031130033 ],
            //     multiplicity: 1
            // }]
            //
            // with original bracket width = 2.220446049250313e-16 = eps

            let t2_ = (ts[2].tS + ts[2].tE) / 2;
            let t2 = refineK1(ts[2], p);

            // ts2 should be around:
            // {
            //     tS: [ -3.4604248197914546e-17, 1.3255582424034453 ],
            //     tE: [ -3.460424819791435e-17, 1.3255582424034453 ],
            //     multiplicity: 1
            // }
            //
            // with original bracket width = 6.661338147750939e-16 = 3*eps

            
            //console.log('--------');
            //console.log(eEstimate(eHorner(p,t0_ - 2*Number.EPSILON)));
            //console.log(eEstimate(eHorner(p,t0_)));
            //console.log(eEstimate(eHorner(p,t0_ + 2*Number.EPSILON)));
            let C0L = Math.abs(eEstimate(eHorner(p,t0_ - 2*Number.EPSILON)));
            let C0  = Math.abs(eEstimate(eHorner(p,t0_)));
            let C0R = Math.abs(eEstimate(eHorner(p,t0_ + 2*Number.EPSILON)));
            assert(C0L > C0);
            assert(C0R > C0);
            
            let tS = t0[0].tS.slice();
            let tSL = [tS[0] - 2*Number.EPSILON**2, tS[1]];
            let tSR = [tS[0] + 2*Number.EPSILON**2, tS[1]];
            //console.log('--------');
            //console.log(eEstimate(eeHorner(p,tSL)));
            //console.log(eEstimate(eeHorner(p,tS)));
            //console.log(eEstimate(eeHorner(p,tSR)));
            let C1SL = Math.abs(eEstimate(eeHorner(p,tSL)));
            let C1S  = Math.abs(eEstimate(eeHorner(p,tS)));
            let C1SR = Math.abs(eEstimate(eeHorner(p,tSR)));
            assert(C1SL > C1S);
            assert(C1SR > C1S);

            let tE = t0[0].tE.slice();
            let tEL = [tE[0] - 2*Number.EPSILON**2, tE[1]];
            let tER = [tE[0] + 2*Number.EPSILON**2, tE[1]];
            //console.log('--------');
            //console.log(eEstimate(eeHorner(p,tEL)));
            //console.log(eEstimate(eeHorner(p,tE)));
            //console.log(eEstimate(eeHorner(p,tER)));
            let C1EL = Math.abs(eEstimate(eeHorner(p,tEL)));
            let C1E  = Math.abs(eEstimate(eeHorner(p,tE)));
            let C1ER = Math.abs(eEstimate(eeHorner(p,tER)));
            assert(C1EL > C1E);
            assert(C1ER > C1E);
		}
	});
});
