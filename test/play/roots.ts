
import { hornerErrorBound } from '../../src/evaluate/horner-error-bound';
import { evaluateExact } from '../../src/evaluate/evaluate-exact';
import { estimate, twoSum } from 'flo-numerical';
import { quadAllRootsPrecise } from '../../src/roots/quad-precise/quad-all-roots-precise';
import { SumK } from '../../src/evaluate/sum-k'
import { compHorner } from '../../src/evaluate/comp-horner'
import { compHornerIsFaithful } from '../../src/evaluate/comp-horner-is-faithful'
import { Horner } from '../../src/evaluate/horner'
import { CompHornerK } from '../../src/evaluate/comp-horner-k'
import { conditionNumber } from '../../src/error-analysis/condition-number';
import { hornerWithRunningError } from '../../src/evaluate/horner-with-running-error';
import { flatCoefficients, allRootsPrecise, allRoots, toCasStr, multiply } from '../../src';
import { fromRootsExact, fromRoots } from '../../src/roots/from-roots';
import { allRootsExact } from '../../src/roots/exact/all-roots-exact';
import { differentiateExact } from '../../src/calculus/differentiate';
import { findBadPoly } from '../helpers/find-bad-poly'
import { getWilkonsonPolyApprox } from '../helpers/get-wilkonson-poly-approx';

//play();
roots();
//wilkonsonRoots();
//d();


function d() {
    let { p, p_ } = findBadPoly(9, 0);
    let dp = differentiateExact(p_);
}


function play() {
    let p = [
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
    let p_ = p.map(x => [x]);

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

    //let c = 0.4183749565854647;
    let v = 0.789976061321727;
    let v_ = 0.7899760613217272; // === c + 1 ulps
    let _v = 0.7899760613217269; // === c - 1 ulps
    let c = v;
    //let c = v_;
    //let c = _v;
    let cn = conditionNumber(p, c);
    let faith = compHornerIsFaithful(p, c);
    let error = hornerErrorBound(p, c);
    let [y, e] = hornerWithRunningError(p, c);

    log();

    function log() {
        console.log('Condition number ', cn.toExponential(3));
        console.log('Horner ', Horner(p, c));
        console.log('Horner theoretical error bound', error);
        console.log('Horner running error bound', e);
        console.log('compHorner ', compHorner(p, c));
        console.log('faithful ', faith);
        console.log('compHornerK = 2 ', CompHornerK(p, c, 2));
        console.log('compHornerK = 3 ', CompHornerK(p, c, 3));
        console.log('exact           ', estimate(evaluateExact(p_, [c])));
    }
}


function wilkonsonRoots() {
    let wilkonsonsPoly = getWilkonsonPolyApprox(15);
    //console.log(wilkonsonsPoly);
    console.log(toCasStr(wilkonsonsPoly));
    console.log(allRoots(wilkonsonsPoly));
    console.log(allRootsPrecise(wilkonsonsPoly, 0, 20));
    console.log(allRootsExact(wilkonsonsPoly.map(x => [x]), [0], [20]).map(estimate));
}


function roots() {
    let { p_, p, _roots } = findBadPoly(9, 5, 0.001);
    let estimates = {
        
    }
    let rootsSuperPrecise = allRootsExact(p_,[0],[1]);
    let rootsVeryPrecise = quadAllRootsPrecise(p_,0,1);
    let rootsPrecise = allRootsPrecise(p, 0, 1);
    let roots = allRoots(p, 0, 1);
    //if (roots.length !== rootsPrecise.length || roots.length !== rootsVeryPrecise.length) {
        //throw 'root cardinality differs'
    //}
    _roots.sort((a,b) => a-b)
    let len = Math.max(roots.length, rootsPrecise.length, rootsVeryPrecise.length)
    for (let i=0; i<_roots.length; i++) {
        console.log('roots                    ', _roots[i]);
        console.log('super precise            ', rootsSuperPrecise[i] ? estimate(rootsSuperPrecise[i]) : undefined);
        console.log('very precise             ', rootsVeryPrecise[i]);
        console.log('precise (Number.EPSILON) ', rootsPrecise[i]);
        console.log('standard                 ', roots[i]);
        console.log('----------------------------------------------');
    }
}
