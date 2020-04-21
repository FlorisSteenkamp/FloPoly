"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the approximate result of performing a change of variables of the form: p(x) <- p(x + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param b
 * @example
 * changeVariablesTranslateX([1,2,7], 3); //=> [1, 8, 22]
 */
function changeVariablesTranslateX(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    let d = p.length - 1;
    // Initialize a zero matrix
    let t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill(0));
    }
    // Calculate the triangular matrix T
    t[0][0] = 1;
    for (let j = 1; j <= d; j++) {
        t[0][j] = b * t[0][j - 1];
        for (let i = 1; i <= j; i++) {
            t[i][j] = b * t[i][j - 1] + t[i - 1][j - 1];
        }
    }
    // Multiply
    let res = new Array(d + 1).fill(0);
    for (let i = 0; i <= d; i++) {
        res[d - i] = 0;
        for (let j = i; j <= d; j++) {
            let acc = t[i][j] * p[d - j];
            res[d - i] += acc;
        }
    }
    return res;
}
exports.changeVariablesTranslateX = changeVariablesTranslateX;
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(x + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param b
 */
function changeVariablesTranslateXExact(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    let d = p.length - 1;
    // Initialize a zero matrix
    let t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill([0]));
    }
    // Calculate the triangular matrix T
    t[0][0] = [1];
    for (let j = 1; j <= d; j++) {
        t[0][j] = flo_numerical_1.scaleExpansion2(b, t[0][j - 1]);
        for (let i = 1; i <= j; i++) {
            t[i][j] = flo_numerical_1.fastExpansionSum(flo_numerical_1.scaleExpansion2(b, t[i][j - 1]), t[i - 1][j - 1]);
        }
    }
    // Multiply
    let res = new Array(d + 1).fill([0]);
    for (let i = 0; i <= d; i++) {
        res[d - i] = [0];
        for (let j = i; j <= d; j++) {
            let acc = flo_numerical_1.expansionProduct(t[i][j], p[d - j]);
            res[d - i] = flo_numerical_1.fastExpansionSum(res[d - i], acc);
        }
    }
    return res;
}
exports.changeVariablesTranslateXExact = changeVariablesTranslateXExact;
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(x + b).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param b
 */
function changeVariablesTranslateXExactExp(p, b) {
    // We let the coefficients of p(x + b) be denoted by d_i in the code below. 
    // d_i is calculated as d = T*c, where c are the original coefficients.
    let d = p.length - 1;
    // Initialize a zero matrix
    let t = [];
    for (let i = 0; i < d + 1; i++) {
        t.push(new Array(d + 1).fill([0]));
    }
    // Calculate the triangular matrix T
    t[0][0] = [1];
    for (let j = 1; j <= d; j++) {
        t[0][j] = flo_numerical_1.expansionProduct(b, t[0][j - 1]);
        for (let i = 1; i <= j; i++) {
            t[i][j] = flo_numerical_1.fastExpansionSum(flo_numerical_1.expansionProduct(b, t[i][j - 1]), t[i - 1][j - 1]);
        }
    }
    // Multiply
    let res = new Array(d + 1).fill([0]);
    for (let i = 0; i <= d; i++) {
        res[d - i] = [0];
        for (let j = i; j <= d; j++) {
            let acc = flo_numerical_1.expansionProduct(t[i][j], p[d - j]);
            res[d - i] = flo_numerical_1.fastExpansionSum(res[d - i], acc);
        }
    }
    return res;
}
exports.changeVariablesTranslateXExactExp = changeVariablesTranslateXExactExp;
//# sourceMappingURL=change-variables-translate-x.js.map