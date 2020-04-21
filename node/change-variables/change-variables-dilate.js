"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns the approximate result of performing a change of variables of the form: p(x) <- p(ax).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @example
 * changeVariablesDilate([1,2,7], 3); //=> [9, 6, 7]
 */
function changeVariablesDilate(p, a) {
    // We let the coefficients of p(ax) be denoted by d_i in the code below. 
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
        t[0][j] = 0;
        for (let i = 1; i <= j; i++) {
            t[i][j] = a * t[i - 1][j - 1];
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
exports.changeVariablesDilate = changeVariablesDilate;
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(ax).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @example
 * changeVariables([[1],[2],[7]], [3]); //=> [[9], [6], [7]]
 */
function changeVariablesDilateExactExp(p, a) {
    // We let the coefficients of p(ax + b) be denoted by d_i in the code below. 
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
        t[0][j] = [0];
        for (let i = 1; i <= j; i++) {
            t[i][j] = flo_numerical_1.expansionProduct(a, t[i - 1][j - 1]);
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
exports.changeVariablesDilateExactExp = changeVariablesDilateExactExp;
/**
 * Returns the exact result of performing a change of variables of the form: p(x) <- p(ax).
 * See this stackoverflow question http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system
 * @param p a polynomial
 * @param a
 * @example
 * changeVariables([[1],[2],[7]], 3); //=> [[9], [6], [7]]
 */
function changeVariablesDilateExact(p, a) {
    // We let the coefficients of p(ax + b) be denoted by d_i in the code below. 
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
        t[0][j] = [0];
        for (let i = 1; i <= j; i++) {
            t[i][j] = flo_numerical_1.scaleExpansion2(a, t[i - 1][j - 1]);
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
exports.changeVariablesDilateExact = changeVariablesDilateExact;
//# sourceMappingURL=change-variables-dilate.js.map