
import { expansionProduct, expansionDiff, expansionDiv, estimate } from 'flo-numerical';


let u = Number.EPSILON;
let n = 10;
let ku = (k: number) => expansionProduct([k],[u]);
let getGamma = (k: number) => ({
    k,
    float: (k*u)/(1-k*u),
    //exact: estimate(expansionDiv(ku(k), expansionDiff([1], ku(k)), 10)) 
    exact: expansionDiv(ku(k), expansionDiff([1], ku(k)), 10) 
});

let γs = [...Array(n+1).keys()].slice(1)
    .map(k => getGamma(k*1));

console.log(γs);


