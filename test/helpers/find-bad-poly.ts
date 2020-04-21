
import { flatCoefficients, toCasStr } from "../../src";
import { perturb } from "./perturb";
import { fromRootsExact } from "../../src/roots/from-roots";
import { estimate } from "flo-numerical";


/**
 * @param n the order of the polynomial
 * @param numCloseRoots the number of roots that should be close together
 * @param numRealRoots the number of roots that should be real
 * @param sep an approximate root seperation for the close roots generated at random
 */
function findBadPoly(
        n: number, 
        //numRealRoots: number,
        numCloseRoots: number,
        sep = 0.1,
        numDoubleRoots = 0,
        numTripleRoots = 0,
        numQuadRoots = 0) {

    let SEED = 11111;

    // get 10 random values in [0,1]
    let randoms1 = flatCoefficients(n, 0, 1, SEED);
    let rs = randoms1.p;
    SEED = randoms1.seed;
    let randoms2 = flatCoefficients(n, 0, 1, SEED);
    let bys = randoms2.p;
    
    
    let _roots: number[] = [];
    let numSpecialRoots = numCloseRoots + 2*numDoubleRoots;

    for (let i=0; i<numCloseRoots; i++) {
        _roots.push(rs[0]); // push the same root multiple times
    }
    // perturb close roots by some small amount
    _roots = _roots.map((x,i) => perturb(x, bys[i], sep));

    for (let i=numCloseRoots; i<numCloseRoots + 2*numDoubleRoots; i += 2) {
        _roots.push(rs[i]); // push the same root twice
        _roots.push(rs[i]); // push the same root twice
    }

    // push additional roots
    for (let i=numSpecialRoots; i<n; i++) {
        _roots.push(rs[i]); // push additional random roots in [0,1]
    }

    _roots[9] = 0;
    _roots[8] = 0;
    _roots[7] = 0;
    // change to quad precision
    //let p_ = fromRootsExact(_roots).map(pi => pi.slice(pi.length-2,pi.length)); 
    let p_ = fromRootsExact(_roots); 
    //console.log(p_)
    //let _p_ = fromRootsPrecise(_roots); // this poly has expansion coeffs
    //let p_ = _p_.map(x => [x[x.length-1]]) // this poly has estimated expansion coeffs

    //let p_ = _p_;
    let p = p_.map(estimate); // this poly has double coeffs

    //console.log(toCasStr(p));

    return { p_, p, _roots }
}


export { findBadPoly }
