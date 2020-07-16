
import { expansionProduct, eDiff, eDiv, eEstimate } from 'big-float-ts';


let u = Number.EPSILON;
let n = 10;
let ku = (k: number) => expansionProduct([k],[u]);
let getGamma = (k: number) => ({
    k,
    float: (k*u)/(1-k*u),
    //exact: eEstimate(eDiv(ku(k), eDiff([1], ku(k)), 10)) 
    exact: eDiv(ku(k), eDiff([1], ku(k)), 10) 
});

let γs = [...Array(n+1).keys()].slice(1)
    .map(k => getGamma(k*1));

console.log(γs);


