
import { flatRoots, flatRootsArr, flatCoefficients, flatCoefficientsArr } from "../double/random"
import { scaleFloatsToBigints } from "../../scale-to-int/scale-floats-to-bigints";


/**
 * Some seed value for the simple random number generator.
 * 
 * @internal
 */
const SEED = 123456789;


/**
 * Generates and returns a polynomial with random **roots** (with coefficients 
 * given densely as an array of bigints from highest to 
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 * 
 * * all roots will approximate real values so is not at all representative of 
 * a natural random root distribution
 * 
 * * the exact same polynomial will be created on each call to this function 
 * if the same seed is used; this is by design to improve testing.
 * 
 * @param d the degree of the polynomials 
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 */
function bFlatRoots(
        d: number,
        a: number = 0, 
        b: number = 1, 
        seed: number = SEED, 
        odds: number = 0): { p: bigint[], seed: number; } {

    const res = flatRoots(d,a,b,seed,odds);

    return { p: scaleFloatsToBigints(res.p), seed: res.seed };
}


/**
 * Generates and returns an array of polynomials with random **roots** (with 
 * coefficients given densely as an array of bigints from highest to 
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 * 
 * * all roots will approximate real values so is not at all representative of 
 * a natural random root distribution
 * 
 * * the exact same polynomials will be created on each call to this function 
 * if the same seed is used; this is by design to improve testing.
 * 
 * @param n the number of polynomials to generate.
 * @param d the degree of the polynomials 
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 */
function bFlatRootsArr(
        n: number, 
        d: number,
        a: number = 0, 
        b: number = 1, 
        seed: number = SEED, 
        odds: number = 0): bigint[][] {

    return flatRootsArr(n,d,a,b,seed,odds).map(scaleFloatsToBigints);
}


/**
 * Generates and returns a polynomial with random **coefficients** 
 * (with coefficients given densely as an array of bigints from highest to 
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 * 
 * * the exact same polynomials will be created on each call to this function 
 * if the same seed is used; this is by design to improve testing.
 * 
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 */
function bFlatCoefficients(
        d: number,
        a: number = 0, 
        b: number = 1, 
        seed: number = SEED): { p: bigint[], seed: number; } {

    const res = flatCoefficients(d,a,b,seed);

    return { p: scaleFloatsToBigints(res.p), seed: res.seed };
}


/**
 * Generates and returns an array of polynomials with random **coefficients** 
 * (with coefficients given densely as an array of bigints from highest to 
 * lowest power, e.g. `[5n,-3n,0n]` represents the polynomial `5x^2 - 3x`).
 * 
 * * the exact same polynomials will be created on each call to this function 
 * if the same seed is used; this is by design to improve testing.
 * 
 * @param n the number of polynomials to generate.
 * @param d the length of the polynomial coefficients array
 * @param a defaults to 0; the lower bound of the coefficients
 * @param b defaults to 1; the upper bound of the coefficients
 * @param seed defaults to 123456789; a seed value in [0,4294967296]
 * @param odds defaults to 0; the odds that a root will be doubled (applied
 * recursively so that some roots could be tripled, etc.
 */
function bFlatCoefficientsArr(
        n: number, 
        d: number,
        a: number = 0, 
        b: number = 1, 
        seed: number = SEED, 
        odds: number = 0): bigint[][] {

    return flatCoefficientsArr(n,d,a,b,seed,odds).map(scaleFloatsToBigints);
}


export { 
    bFlatRoots, 
    bFlatRootsArr, 
    bFlatCoefficients, 
    bFlatCoefficientsArr 
}
