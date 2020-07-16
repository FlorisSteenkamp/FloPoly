"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rem = exports.expIsZero = exports.subresultantPseudoRemainderSequence = exports.divideByConst = exports.quadSplit = exports.absCoeff = exports.AbsHorner = exports.compHornerWithRunningError = exports.EFTHornerK = exports.HornerAbsSum = exports.HornerSum = exports.EFTHorner = exports.expApproxRemoveLeadingZeros = exports.subtractExact = exports.multiplyExact = exports.addExact = exports.expElevateDegree = exports.γγ = exports.γ = exports.PolyDebug = exports.mid = exports.refineK1 = exports.rootIntervalToExp = exports.refineMultiWithErrBounds = exports.createRootExact = exports.evalK1MultiWithErrBounds = exports.allRootsMultiWithErrBounds = exports.allRoots = exports.fromRoots = exports.predictiveRandom = exports.flatCoefficientsArr = exports.flatCoefficients = exports.flatRootsArr = exports.flatRoots = exports.hornerWithRunningError = exports.compHornerIsFaithful = exports.CompHornerK = exports.SumK = exports.HornerExact = exports.Horner = exports.hornerErrorBound = exports.conditionNumber = exports.maxAbsCoeffPolyEval = exports.rootMagnitudeUpperBound_rouche = exports.negativeRootLowerBound_LMQ = exports.negativeRootUpperBound_LMQ = exports.positiveRootLowerBound_LMQ = exports.positiveRootUpperBound_LMQ = exports.rootMagnitudeUpperBound_fujiwara = exports.bisection = exports.brent = exports.numRootsInRangeExact = exports.numRootsInRange = exports.quadraticRoots = exports.scalePolyToIntsExp = exports.scaleFloatsToInts = exports.scaleFloatToInt = exports.getContent = exports.gcdExact = exports.gcdInts = exports.gcdInt = exports.toCasStr = exports.pInfNorm = exports.deflateQuad = exports.deflate = exports.expRemoveLeadingZeros = exports.removeLeadingZeros = exports.approxRemoveLeadingZeros = exports.sturmChain = exports.reflectAboutYAxis = exports.changeVariablesDilateExact = exports.changeVariablesDilateExactExp = exports.changeVariablesDilate = exports.changeVariablesTranslateXExact = exports.changeVariablesTranslateXExactExp = exports.changeVariablesTranslateX = exports.changeVariablesLinearExact = exports.changeVariablesLinearExactExp = exports.changeVariablesLinear = exports.isConstMultipleOf = exports.invert = exports.signChanges = exports.compHorner = exports.evaluateAt0 = exports.evaluateExact = exports.evaluate = exports.degree = exports.multiply = exports.differentiate = exports.negate = exports.expMultiplyByConst = exports.multiplyByConst = exports.subtract = exports.add = exports.equal = exports.operators = void 0;
const equal_1 = require("./basic/equal");
Object.defineProperty(exports, "equal", { enumerable: true, get: function () { return equal_1.equal; } });
const add_1 = require("./basic/add");
Object.defineProperty(exports, "add", { enumerable: true, get: function () { return add_1.add; } });
const subtract_1 = require("./basic/subtract");
Object.defineProperty(exports, "subtract", { enumerable: true, get: function () { return subtract_1.subtract; } });
const multiply_by_const_1 = require("./basic/multiply-by-const");
Object.defineProperty(exports, "multiplyByConst", { enumerable: true, get: function () { return multiply_by_const_1.multiplyByConst; } });
const multiply_by_const_2 = require("./basic/multiply-by-const");
Object.defineProperty(exports, "expMultiplyByConst", { enumerable: true, get: function () { return multiply_by_const_2.expMultiplyByConst; } });
const negate_1 = require("./basic/negate");
Object.defineProperty(exports, "negate", { enumerable: true, get: function () { return negate_1.negate; } });
const differentiate_1 = require("./calculus/differentiate");
Object.defineProperty(exports, "differentiate", { enumerable: true, get: function () { return differentiate_1.differentiate; } });
const multiply_1 = require("./basic/multiply");
Object.defineProperty(exports, "multiply", { enumerable: true, get: function () { return multiply_1.multiply; } });
const degree_1 = require("./basic/degree");
Object.defineProperty(exports, "degree", { enumerable: true, get: function () { return degree_1.degree; } });
const gcd_prs_1 = require("./gcd/gcd-prs/gcd-prs");
Object.defineProperty(exports, "gcdExact", { enumerable: true, get: function () { return gcd_prs_1.gcdExact; } });
const evaluate_1 = require("./evaluate/evaluate");
Object.defineProperty(exports, "evaluate", { enumerable: true, get: function () { return evaluate_1.evaluate; } });
const evaluate_exact_1 = require("./evaluate/evaluate-exact");
Object.defineProperty(exports, "evaluateExact", { enumerable: true, get: function () { return evaluate_exact_1.evaluateExact; } });
const horner_1 = require("./evaluate/horner");
Object.defineProperty(exports, "Horner", { enumerable: true, get: function () { return horner_1.Horner; } });
const comp_horner_1 = require("./evaluate/comp-horner");
Object.defineProperty(exports, "compHorner", { enumerable: true, get: function () { return comp_horner_1.compHorner; } });
const comp_horner_is_faithful_1 = require("./evaluate/comp-horner-is-faithful");
Object.defineProperty(exports, "compHornerIsFaithful", { enumerable: true, get: function () { return comp_horner_is_faithful_1.compHornerIsFaithful; } });
const is_const_multiple_of_1 = require("./basic/is-const-multiple-of");
Object.defineProperty(exports, "isConstMultipleOf", { enumerable: true, get: function () { return is_const_multiple_of_1.isConstMultipleOf; } });
const sum_k_1 = require("./evaluate/sum-k");
Object.defineProperty(exports, "SumK", { enumerable: true, get: function () { return sum_k_1.SumK; } });
const comp_horner_k_1 = require("./evaluate/comp-horner-k");
Object.defineProperty(exports, "CompHornerK", { enumerable: true, get: function () { return comp_horner_k_1.CompHornerK; } });
const evaluate_at_0_1 = require("./evaluate/evaluate-at-0");
Object.defineProperty(exports, "evaluateAt0", { enumerable: true, get: function () { return evaluate_at_0_1.evaluateAt0; } });
const sign_changes_1 = require("./roots/descartes/sign-changes");
Object.defineProperty(exports, "signChanges", { enumerable: true, get: function () { return sign_changes_1.signChanges; } });
const invert_1 = require("./basic/invert");
Object.defineProperty(exports, "invert", { enumerable: true, get: function () { return invert_1.invert; } });
const change_variables_linear_1 = require("./change-variables/change-variables-linear");
Object.defineProperty(exports, "changeVariablesLinear", { enumerable: true, get: function () { return change_variables_linear_1.changeVariablesLinear; } });
const change_variables_linear_2 = require("./change-variables/change-variables-linear");
Object.defineProperty(exports, "changeVariablesLinearExactExp", { enumerable: true, get: function () { return change_variables_linear_2.changeVariablesLinearExactExp; } });
const change_variables_linear_3 = require("./change-variables/change-variables-linear");
Object.defineProperty(exports, "changeVariablesLinearExact", { enumerable: true, get: function () { return change_variables_linear_3.changeVariablesLinearExact; } });
const change_variables_translate_x_1 = require("./change-variables/change-variables-translate-x");
Object.defineProperty(exports, "changeVariablesTranslateX", { enumerable: true, get: function () { return change_variables_translate_x_1.changeVariablesTranslateX; } });
const change_variables_translate_x_2 = require("./change-variables/change-variables-translate-x");
Object.defineProperty(exports, "changeVariablesTranslateXExactExp", { enumerable: true, get: function () { return change_variables_translate_x_2.changeVariablesTranslateXExactExp; } });
const change_variables_translate_x_3 = require("./change-variables/change-variables-translate-x");
Object.defineProperty(exports, "changeVariablesTranslateXExact", { enumerable: true, get: function () { return change_variables_translate_x_3.changeVariablesTranslateXExact; } });
const change_variables_dilate_1 = require("./change-variables/change-variables-dilate");
Object.defineProperty(exports, "changeVariablesDilate", { enumerable: true, get: function () { return change_variables_dilate_1.changeVariablesDilate; } });
const change_variables_dilate_2 = require("./change-variables/change-variables-dilate");
Object.defineProperty(exports, "changeVariablesDilateExactExp", { enumerable: true, get: function () { return change_variables_dilate_2.changeVariablesDilateExactExp; } });
const change_variables_dilate_3 = require("./change-variables/change-variables-dilate");
Object.defineProperty(exports, "changeVariablesDilateExact", { enumerable: true, get: function () { return change_variables_dilate_3.changeVariablesDilateExact; } });
const reflect_about_y_axis_1 = require("./change-variables/reflect-about-y-axis");
Object.defineProperty(exports, "reflectAboutYAxis", { enumerable: true, get: function () { return reflect_about_y_axis_1.reflectAboutYAxis; } });
const sturm_chain_1 = require("./remainder-sequences/sturm-chain");
Object.defineProperty(exports, "sturmChain", { enumerable: true, get: function () { return sturm_chain_1.sturmChain; } });
const remove_leading_zeros_1 = require("./basic/remove-leading-zeros");
Object.defineProperty(exports, "removeLeadingZeros", { enumerable: true, get: function () { return remove_leading_zeros_1.removeLeadingZeros; } });
const remove_leading_zeros_2 = require("./basic/remove-leading-zeros");
Object.defineProperty(exports, "approxRemoveLeadingZeros", { enumerable: true, get: function () { return remove_leading_zeros_2.approxRemoveLeadingZeros; } });
const remove_leading_zeros_3 = require("./basic/remove-leading-zeros");
Object.defineProperty(exports, "expRemoveLeadingZeros", { enumerable: true, get: function () { return remove_leading_zeros_3.expRemoveLeadingZeros; } });
const deflate_1 = require("./roots/deflate");
Object.defineProperty(exports, "deflate", { enumerable: true, get: function () { return deflate_1.deflate; } });
Object.defineProperty(exports, "deflateQuad", { enumerable: true, get: function () { return deflate_1.deflateQuad; } });
const p_inf_norm_1 = require("./norm/p-inf-norm");
Object.defineProperty(exports, "pInfNorm", { enumerable: true, get: function () { return p_inf_norm_1.pInfNorm; } });
const to_cas_str_1 = require("./basic/to-cas-str");
Object.defineProperty(exports, "toCasStr", { enumerable: true, get: function () { return to_cas_str_1.toCasStr; } });
const quadratic_roots_1 = require("./roots/quadratic-roots");
Object.defineProperty(exports, "quadraticRoots", { enumerable: true, get: function () { return quadratic_roots_1.quadraticRoots; } });
const num_roots_1 = require("./roots/descartes/num-roots");
Object.defineProperty(exports, "numRootsInRange", { enumerable: true, get: function () { return num_roots_1.numRootsInRange; } });
const num_roots_2 = require("./roots/descartes/num-roots");
Object.defineProperty(exports, "numRootsInRangeExact", { enumerable: true, get: function () { return num_roots_2.numRootsInRangeExact; } });
const brent_1 = require("./roots/standard/brent");
Object.defineProperty(exports, "brent", { enumerable: true, get: function () { return brent_1.brent; } });
const bisection_1 = require("./roots/standard/bisection");
Object.defineProperty(exports, "bisection", { enumerable: true, get: function () { return bisection_1.bisection; } });
const root_bounds_lmq_1 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "positiveRootUpperBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_1.positiveRootUpperBound_LMQ; } });
const root_bounds_lmq_2 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "positiveRootLowerBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_2.positiveRootLowerBound_LMQ; } });
const root_bounds_lmq_3 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "negativeRootUpperBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_3.negativeRootUpperBound_LMQ; } });
const root_bounds_lmq_4 = require("./roots/root-bounds/root-bounds-lmq");
Object.defineProperty(exports, "negativeRootLowerBound_LMQ", { enumerable: true, get: function () { return root_bounds_lmq_4.negativeRootLowerBound_LMQ; } });
const root_magnitude_upper_bound_fujiwara_1 = require("./roots/root-bounds/root-magnitude-upper-bound-fujiwara");
Object.defineProperty(exports, "rootMagnitudeUpperBound_fujiwara", { enumerable: true, get: function () { return root_magnitude_upper_bound_fujiwara_1.rootMagnitudeUpperBound_fujiwara; } });
const root_magnitude_upper_bound_rouche_1 = require("./roots/root-bounds/root-magnitude-upper-bound-rouche");
Object.defineProperty(exports, "rootMagnitudeUpperBound_rouche", { enumerable: true, get: function () { return root_magnitude_upper_bound_rouche_1.rootMagnitudeUpperBound_rouche; } });
const all_roots_1 = require("./roots/standard/all-roots");
Object.defineProperty(exports, "allRoots", { enumerable: true, get: function () { return all_roots_1.allRoots; } });
const all_roots_multi_with_err_bounds_1 = require("./roots/multi-with-err-bound/all-roots-multi-with-err-bounds");
Object.defineProperty(exports, "allRootsMultiWithErrBounds", { enumerable: true, get: function () { return all_roots_multi_with_err_bounds_1.allRootsMultiWithErrBounds; } });
const refine_k1_1 = require("./roots/multi-with-err-bound/refine-k1");
Object.defineProperty(exports, "refineK1", { enumerable: true, get: function () { return refine_k1_1.refineK1; } });
const random_1 = require("./random/random");
Object.defineProperty(exports, "flatRoots", { enumerable: true, get: function () { return random_1.flatRoots; } });
const random_2 = require("./random/random");
Object.defineProperty(exports, "flatRootsArr", { enumerable: true, get: function () { return random_2.flatRootsArr; } });
const random_3 = require("./random/random");
Object.defineProperty(exports, "flatCoefficients", { enumerable: true, get: function () { return random_3.flatCoefficients; } });
const random_4 = require("./random/random");
Object.defineProperty(exports, "flatCoefficientsArr", { enumerable: true, get: function () { return random_4.flatCoefficientsArr; } });
const random_5 = require("./random/random");
Object.defineProperty(exports, "predictiveRandom", { enumerable: true, get: function () { return random_5.predictiveRandom; } });
const horner_error_bound_1 = require("./evaluate/horner-error-bound");
Object.defineProperty(exports, "hornerErrorBound", { enumerable: true, get: function () { return horner_error_bound_1.hornerErrorBound; } });
const horner_exact_1 = require("./evaluate/horner-exact");
Object.defineProperty(exports, "HornerExact", { enumerable: true, get: function () { return horner_exact_1.HornerExact; } });
const horner_with_running_error_1 = require("./evaluate/horner-with-running-error");
Object.defineProperty(exports, "hornerWithRunningError", { enumerable: true, get: function () { return horner_with_running_error_1.hornerWithRunningError; } });
const max_abs_coeff_poly_eval_1 = require("./evaluate/max-abs-coeff-poly-eval");
Object.defineProperty(exports, "maxAbsCoeffPolyEval", { enumerable: true, get: function () { return max_abs_coeff_poly_eval_1.maxAbsCoeffPolyEval; } });
const from_roots_1 = require("./roots/from-roots");
Object.defineProperty(exports, "fromRoots", { enumerable: true, get: function () { return from_roots_1.fromRoots; } });
const condition_number_1 = require("./error-analysis/condition-number");
Object.defineProperty(exports, "conditionNumber", { enumerable: true, get: function () { return condition_number_1.conditionNumber; } });
const scale_float_to_int_1 = require("./scale-to-int/scale-float-to-int");
Object.defineProperty(exports, "scaleFloatToInt", { enumerable: true, get: function () { return scale_float_to_int_1.scaleFloatToInt; } });
const scale_floats_to_ints_1 = require("./scale-to-int/scale-floats-to-ints");
Object.defineProperty(exports, "scaleFloatsToInts", { enumerable: true, get: function () { return scale_floats_to_ints_1.scaleFloatsToInts; } });
const scale_poly_to_ints_1 = require("./scale-to-int/scale-poly-to-ints");
Object.defineProperty(exports, "scalePolyToIntsExp", { enumerable: true, get: function () { return scale_poly_to_ints_1.scalePolyToIntsExp; } });
const eval_k_multi_with_err_bounds_1 = require("./evaluate/eval-k-multi-with-err-bounds");
Object.defineProperty(exports, "evalK1MultiWithErrBounds", { enumerable: true, get: function () { return eval_k_multi_with_err_bounds_1.evalK1MultiWithErrBounds; } });
const debug_1 = require("./debug/debug");
Object.defineProperty(exports, "PolyDebug", { enumerable: true, get: function () { return debug_1.PolyDebug; } });
const root_interval_1 = require("./roots/multi-with-err-bound/root-interval");
Object.defineProperty(exports, "createRootExact", { enumerable: true, get: function () { return root_interval_1.createRootExact; } });
const root_interval_2 = require("./roots/multi-with-err-bound/root-interval");
Object.defineProperty(exports, "mid", { enumerable: true, get: function () { return root_interval_2.mid; } });
const root_interval_to_exp_1 = require("./roots/multi-with-err-bound/root-interval-to-exp");
Object.defineProperty(exports, "rootIntervalToExp", { enumerable: true, get: function () { return root_interval_to_exp_1.rootIntervalToExp; } });
const refine_multi_with_err_bounds_1 = require("./roots/multi-with-err-bound/refine-multi-with-err-bounds");
Object.defineProperty(exports, "refineMultiWithErrBounds", { enumerable: true, get: function () { return refine_multi_with_err_bounds_1.refineMultiWithErrBounds; } });
const gamma_1 = require("./error-analysis/gamma");
Object.defineProperty(exports, "\u03B3", { enumerable: true, get: function () { return gamma_1.γ; } });
const gamma_2 = require("./error-analysis/gamma");
Object.defineProperty(exports, "\u03B3\u03B3", { enumerable: true, get: function () { return gamma_2.γγ; } });
const exp_elevate_degree_1 = require("./euclidean-division/exp-elevate-degree");
Object.defineProperty(exports, "expElevateDegree", { enumerable: true, get: function () { return exp_elevate_degree_1.expElevateDegree; } });
const add_2 = require("./basic/add");
Object.defineProperty(exports, "addExact", { enumerable: true, get: function () { return add_2.addExact; } });
const multiply_2 = require("./basic/multiply");
Object.defineProperty(exports, "multiplyExact", { enumerable: true, get: function () { return multiply_2.multiplyExact; } });
const subtract_2 = require("./basic/subtract");
Object.defineProperty(exports, "subtractExact", { enumerable: true, get: function () { return subtract_2.subtractExact; } });
const remove_leading_zeros_4 = require("./basic/remove-leading-zeros");
Object.defineProperty(exports, "expApproxRemoveLeadingZeros", { enumerable: true, get: function () { return remove_leading_zeros_4.expApproxRemoveLeadingZeros; } });
const eft_horner_1 = require("./evaluate/eft-horner");
Object.defineProperty(exports, "EFTHorner", { enumerable: true, get: function () { return eft_horner_1.EFTHorner; } });
const horner_sum_1 = require("./evaluate/horner-sum");
Object.defineProperty(exports, "HornerSum", { enumerable: true, get: function () { return horner_sum_1.HornerSum; } });
const horner_abs_sum_1 = require("./evaluate/horner-abs-sum");
Object.defineProperty(exports, "HornerAbsSum", { enumerable: true, get: function () { return horner_abs_sum_1.HornerAbsSum; } });
const eft_horner_k_1 = require("./evaluate/eft-horner.k");
Object.defineProperty(exports, "EFTHornerK", { enumerable: true, get: function () { return eft_horner_k_1.EFTHornerK; } });
const comp_horner_with_running_error_1 = require("./evaluate/comp-horner-with-running-error");
Object.defineProperty(exports, "compHornerWithRunningError", { enumerable: true, get: function () { return comp_horner_with_running_error_1.compHornerWithRunningError; } });
const abs_horner_1 = require("./evaluate/abs-horner");
Object.defineProperty(exports, "AbsHorner", { enumerable: true, get: function () { return abs_horner_1.AbsHorner; } });
const abs_coeff_1 = require("./basic/abs-coeff");
Object.defineProperty(exports, "absCoeff", { enumerable: true, get: function () { return abs_coeff_1.absCoeff; } });
const quad_split_1 = require("./evaluate/quad-split");
Object.defineProperty(exports, "quadSplit", { enumerable: true, get: function () { return quad_split_1.quadSplit; } });
const integer_gcd_1 = require("./gcd/integer-gcd");
Object.defineProperty(exports, "gcdInt", { enumerable: true, get: function () { return integer_gcd_1.gcdInt; } });
const integer_gcd_2 = require("./gcd/integer-gcd");
Object.defineProperty(exports, "gcdInts", { enumerable: true, get: function () { return integer_gcd_2.gcdInts; } });
const get_content_1 = require("./gcd/get-content");
Object.defineProperty(exports, "getContent", { enumerable: true, get: function () { return get_content_1.getContent; } });
const divide_by_const_1 = require("./basic/divide-by-const");
Object.defineProperty(exports, "divideByConst", { enumerable: true, get: function () { return divide_by_const_1.divideByConst; } });
const subresultant_pseudo_remainder_sequence_1 = require("./remainder-sequences/subresultant-pseudo-remainder-sequence");
Object.defineProperty(exports, "subresultantPseudoRemainderSequence", { enumerable: true, get: function () { return subresultant_pseudo_remainder_sequence_1.subresultantPseudoRemainderSequence; } });
const is_zero_1 = require("./basic/is-zero");
Object.defineProperty(exports, "expIsZero", { enumerable: true, get: function () { return is_zero_1.expIsZero; } });
const euclidean_division_1 = require("./euclidean-division/euclidean-division");
Object.defineProperty(exports, "rem", { enumerable: true, get: function () { return euclidean_division_1.rem; } });
const operators = {
    // Basic
    equal: equal_1.equal,
    add: add_1.add,
    subtract: subtract_1.subtract,
    multiplyByConst: multiply_by_const_1.multiplyByConst,
    expMultiplyByConst: multiply_by_const_2.expMultiplyByConst,
    negate: negate_1.negate,
    differentiate: differentiate_1.differentiate,
    multiply: multiply_1.multiply,
    degree: degree_1.degree,
    evaluate: evaluate_1.evaluate,
    evaluateExact: evaluate_exact_1.evaluateExact,
    evaluateAt0: evaluate_at_0_1.evaluateAt0,
    compHorner: comp_horner_1.compHorner,
    signChanges: sign_changes_1.signChanges,
    invert: invert_1.invert,
    isConstMultipleOf: is_const_multiple_of_1.isConstMultipleOf,
    changeVariablesLinear: change_variables_linear_1.changeVariablesLinear, changeVariablesLinearExactExp: change_variables_linear_2.changeVariablesLinearExactExp, changeVariablesLinearExact: change_variables_linear_3.changeVariablesLinearExact,
    changeVariablesTranslateX: change_variables_translate_x_1.changeVariablesTranslateX, changeVariablesTranslateXExactExp: change_variables_translate_x_2.changeVariablesTranslateXExactExp, changeVariablesTranslateXExact: change_variables_translate_x_3.changeVariablesTranslateXExact,
    changeVariablesDilate: change_variables_dilate_1.changeVariablesDilate, changeVariablesDilateExactExp: change_variables_dilate_2.changeVariablesDilateExactExp, changeVariablesDilateExact: change_variables_dilate_3.changeVariablesDilateExact,
    reflectAboutYAxis: reflect_about_y_axis_1.reflectAboutYAxis,
    sturmChain: sturm_chain_1.sturmChain,
    approxRemoveLeadingZeros: remove_leading_zeros_2.approxRemoveLeadingZeros,
    removeLeadingZeros: remove_leading_zeros_1.removeLeadingZeros,
    expRemoveLeadingZeros: remove_leading_zeros_3.expRemoveLeadingZeros,
    deflate: deflate_1.deflate,
    deflateQuad: deflate_1.deflateQuad,
    pInfNorm: p_inf_norm_1.pInfNorm,
    toCasStr: to_cas_str_1.toCasStr,
    // gcd
    gcdInt: integer_gcd_1.gcdInt,
    gcdInts: integer_gcd_2.gcdInts,
    gcdExact: gcd_prs_1.gcdExact,
    getContent: get_content_1.getContent,
    // other
    scaleFloatToInt: scale_float_to_int_1.scaleFloatToInt,
    scaleFloatsToInts: scale_floats_to_ints_1.scaleFloatsToInts,
    scalePolyToIntsExp: scale_poly_to_ints_1.scalePolyToIntsExp,
    // Root operators
    quadraticRoots: quadratic_roots_1.quadraticRoots,
    numRootsInRange: num_roots_1.numRootsInRange,
    numRootsInRangeExact: num_roots_2.numRootsInRangeExact,
    brent: brent_1.brent,
    bisection: bisection_1.bisection,
    // Root bounds
    rootMagnitudeUpperBound_fujiwara: root_magnitude_upper_bound_fujiwara_1.rootMagnitudeUpperBound_fujiwara,
    positiveRootUpperBound_LMQ: root_bounds_lmq_1.positiveRootUpperBound_LMQ,
    positiveRootLowerBound_LMQ: root_bounds_lmq_2.positiveRootLowerBound_LMQ,
    negativeRootUpperBound_LMQ: root_bounds_lmq_3.negativeRootUpperBound_LMQ,
    negativeRootLowerBound_LMQ: root_bounds_lmq_4.negativeRootLowerBound_LMQ,
    rootMagnitudeUpperBound_rouche: root_magnitude_upper_bound_rouche_1.rootMagnitudeUpperBound_rouche,
    // Error analysis
    maxAbsCoeffPolyEval: max_abs_coeff_poly_eval_1.maxAbsCoeffPolyEval,
    conditionNumber: condition_number_1.conditionNumber,
    hornerErrorBound: horner_error_bound_1.hornerErrorBound,
    Horner: horner_1.Horner,
    HornerExact: horner_exact_1.HornerExact,
    SumK: sum_k_1.SumK,
    CompHornerK: comp_horner_k_1.CompHornerK,
    compHornerIsFaithful: comp_horner_is_faithful_1.compHornerIsFaithful,
    hornerWithRunningError: horner_with_running_error_1.hornerWithRunningError,
    // Random
    flatRoots: random_1.flatRoots,
    flatRootsArr: random_2.flatRootsArr,
    flatCoefficients: random_3.flatCoefficients,
    flatCoefficientsArr: random_4.flatCoefficientsArr,
    predictiveRandom: random_5.predictiveRandom,
    // Roots
    fromRoots: from_roots_1.fromRoots,
    allRoots: all_roots_1.allRoots,
    allRootsMultiWithErrBounds: all_roots_multi_with_err_bounds_1.allRootsMultiWithErrBounds,
    evalK1MultiWithErrBounds: eval_k_multi_with_err_bounds_1.evalK1MultiWithErrBounds,
    createRootExact: root_interval_1.createRootExact,
    refineMultiWithErrBounds: refine_multi_with_err_bounds_1.refineMultiWithErrBounds,
    rootIntervalToExp: root_interval_to_exp_1.rootIntervalToExp,
    refineK1: refine_k1_1.refineK1,
    mid: root_interval_2.mid,
    // to be categorized
    γ: gamma_1.γ,
    γγ: gamma_2.γγ,
    expElevateDegree: exp_elevate_degree_1.expElevateDegree,
    addExact: add_2.addExact,
    multiplyExact: multiply_2.multiplyExact,
    subtractExact: subtract_2.subtractExact,
    expApproxRemoveLeadingZeros: remove_leading_zeros_4.expApproxRemoveLeadingZeros,
    EFTHorner: eft_horner_1.EFTHorner,
    HornerSum: horner_sum_1.HornerSum,
    HornerAbsSum: horner_abs_sum_1.HornerAbsSum,
    EFTHornerK: eft_horner_k_1.EFTHornerK,
    compHornerWithRunningError: comp_horner_with_running_error_1.compHornerWithRunningError,
    AbsHorner: abs_horner_1.AbsHorner,
    absCoeff: abs_coeff_1.absCoeff,
    quadSplit: quad_split_1.quadSplit,
    divideByConst: divide_by_const_1.divideByConst,
    subresultantPseudoRemainderSequence: subresultant_pseudo_remainder_sequence_1.subresultantPseudoRemainderSequence,
    expIsZero: is_zero_1.expIsZero,
    rem: euclidean_division_1.rem,
};
exports.operators = operators;
//# sourceMappingURL=index.js.map